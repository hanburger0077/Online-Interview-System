/**
 * HTTP 请求封装
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { appConfig, API_TIMEOUT, TOKEN_KEY } from '@/config'
import { logger } from '@/utils/logger'
import { trackApiError } from '@/utils/monitor'
import { getLocal } from '@/utils/storage'

/**
 * 创建 Axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    // 添加 Token（从 localStorage 获取，待应用层对接 authStore）
    const token = getLocal<string>(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 日志记录
    logger.debug(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data)

    return config
  },
  error => {
    logger.error('[HTTP] 请求错误', error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response

    // 日志记录
    logger.debug(`[HTTP] 响应 ${config.url}`, data)

    // 统一响应处理
    if (data.code !== undefined) {
      if (data.code === 0 || data.code === 200) {
        return data.data
      } else {
        // 业务错误
        const errorMsg = data.message || '请求失败'
        ElMessage.error(errorMsg)
        logger.warn(`[HTTP] 业务错误: ${errorMsg}`, data)
        return Promise.reject(new Error(errorMsg))
      }
    }

    // 如果没有标准格式，直接返回
    return data
  },
  error => {
    // HTTP 错误处理
    const { response, message, config } = error

    if (response) {
      const { status, data } = response
      let errorMsg = data?.message || message || '请求失败'

      switch (status) {
        case 401:
          errorMsg = '未授权，请重新登录'
          // TODO: 应用层对接 authStore 清除登录信息
          // 跳转到登录页
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

      // 上报 API 错误
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

/**
 * 通用请求方法
 */
export class Http {
  /**
   * GET 请求
   */
  static get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   */
  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  }

  /**
   * PUT 请求
   */
  static put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  }

  /**
   * PATCH 请求
   */
  static patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config)
  }

  /**
   * DELETE 请求
   */
  static delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, { params, ...config })
  }

  /**
   * 上传文件
   */
  static upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })
  }

  /**
   * 下载文件
   */
  static download(url: string, filename?: string, params?: any): Promise<void> {
    return instance
      .get(url, {
        params,
        responseType: 'blob',
      })
      .then((response: any) => {
        const blob = new Blob([response])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = filename || 'download'
        link.click()
        window.URL.revokeObjectURL(link.href)
      })
  }
}

/**
 * 导出实例（用于特殊场景）
 */
export default instance

