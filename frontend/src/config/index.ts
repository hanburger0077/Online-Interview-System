interface AppConfig {
  env: string
  apiBaseUrl: string
  wsBaseUrl: string
  useMock: boolean
  useProxy: boolean
  rtcProvider: string
  debug: boolean
  logLevel: string
  cdnUrl?: string
}

export const appConfig: AppConfig = {
  env: import.meta.env.VITE_ENV || 'development',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  wsBaseUrl: import.meta.env.VITE_WS_BASE_URL || '',
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
  useProxy: import.meta.env.VITE_USE_PROXY === 'true',
  rtcProvider: import.meta.env.VITE_RTC_PROVIDER || 'webrtc',
  debug: import.meta.env.VITE_DEBUG === 'true',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'INFO',
  cdnUrl: import.meta.env.VITE_CDN_URL,
}

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || '面试系统'
export const API_TIMEOUT = 30000
export const UPLOAD_SIZE_LIMIT = Number(import.meta.env.VITE_UPLOAD_SIZE) || 10

export const TOKEN_KEY = 'access_token'
export const USER_KEY = 'user_info'

export const ROUTE_WHITE_LIST = ['/auth/login', '/auth/register', '/404', '/403']

export const ANTI_CHEAT_CONFIG = {
  enabled: true,
  maxBlurCount: 10,
  warningCount: 3,
}

export const LOG_CONFIG = {
  level: appConfig.logLevel,
  enableConsole: appConfig.debug,
  enableRemote: !appConfig.debug,
  remoteUrl: import.meta.env.VITE_LOG_REPORT_URL,
}
