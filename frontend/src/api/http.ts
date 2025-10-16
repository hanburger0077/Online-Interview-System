import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { appConfig, API_TIMEOUT, TOKEN_KEY } from '@/config'
import { logger } from '@/utils/logger'
import { trackApiError } from '@/utils/monitor'
import { getLocal } from '@/utils/storage'

const instance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  config => {
    const token = getLocal<string>(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    logger.debug(
      `[HTTP] ${config.method?.toUpperCase()} ${config.url}`,
      config.params || config.data
    )
    return config
  },
  error => {
    logger.error('[HTTP] 请求错误', error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response
    logger.debug(`[HTTP] 响应 ${config.url}`, data)

    if (data.code !== undefined) {
      if (data.code === 0 || data.code === 200) {
        return data.data
      } else {
        const errorMsg = data.message || '请求失败'
        ElMessage.error(errorMsg)
        logger.warn(`[HTTP] 业务错误: ${errorMsg}`, data)
        return Promise.reject(new Error(errorMsg))
      }
    }
    return data
  },
  error => {
    const { response, message, config } = error

    if (response) {
      const { status, data } = response
      let errorMsg = data?.message || message || '请求失败'

      switch (status) {
        case 401:
          errorMsg = '未授权，请重新登录'
          window.location.href = '/auth/login'
          break
        case 403:
          errorMsg = '您没有权限访问'
          break
        case 404:
          errorMsg = '请求的资源不存在'
          break
        case 500:
          errorMsg = '服务器错误'
          break
        case 502:
          errorMsg = '网关错误'
          break
        case 503:
          errorMsg = '服务暂时不可用'
          break
        case 504:
          errorMsg = '网关超时'
          break
      }

      ElMessage.error(errorMsg)
      logger.error(`[HTTP] ${status} 错误: ${errorMsg}`, response)
      trackApiError(config?.url || 'unknown', status, errorMsg, {
        method: config?.method,
        params: config?.params,
      })
    } else if (message.includes('timeout')) {
      ElMessage.error('请求超时，请稍后重试')
      logger.error('[HTTP] 请求超时', error)
      trackApiError(config?.url || 'unknown', 0, '请求超时')
    } else if (message.includes('Network Error')) {
      ElMessage.error('网络错误，请检查网络连接')
      logger.error('[HTTP] 网络错误', error)
      trackApiError(config?.url || 'unknown', 0, '网络错误')
    } else {
      ElMessage.error('请求失败，请稍后重试')
      logger.error('[HTTP] 未知错误', error)
      trackApiError(config?.url || 'unknown', 0, message || '未知错误')
    }

    return Promise.reject(error)
  }
)

export class Http {
  static get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, { params, ...config })
  }

  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  }

  static put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  }

  static patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config)
  }

  static delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, { params, ...config })
  }

  static upload<T = any>(
    url: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percent)
        }
      },
    })
  }

  static download(url: string, filename: string, params?: any): Promise<void> {
    return instance
      .get(url, {
        params,
        responseType: 'blob',
      })
      .then((response: any) => {
        const blob = new Blob([response])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        link.click()
        URL.revokeObjectURL(link.href)
      })
  }
}

export default instance
