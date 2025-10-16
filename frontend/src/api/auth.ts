/**
 * 鉴权相关 API
 * 
 * 说明：
 * 接口类型定义待应用层成员补充
 */
import { Http } from './http'

/**
 * 登录请求参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * 登录
 */
export function login(data: LoginParams) {
  return Http.post<any>('/auth/login', data)
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser() {
  return Http.get<any>('/me')
}

/**
 * 登出
 */
export function logout() {
  return Http.post('/auth/logout')
}

/**
 * 刷新 Token
 */
export function refreshToken() {
  return Http.post<{ token: string }>('/auth/refresh')
}
