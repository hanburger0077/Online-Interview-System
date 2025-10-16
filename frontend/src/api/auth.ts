import { Http } from './http'

export interface LoginParams {
  username: string
  password: string
}

export function login(data: LoginParams) {
  return Http.post<any>('/auth/login', data)
}

export function getCurrentUser() {
  return Http.get<any>('/me')
}

export function logout() {
  return Http.post('/auth/logout')
}

export function refreshToken() {
  return Http.post<{ token: string }>('/auth/refresh')
}
