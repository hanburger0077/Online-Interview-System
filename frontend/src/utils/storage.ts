/**
 * 本地存储工具
 */

const PREFIX = 'interview_system_'

/**
 * 设置 localStorage
 */
export function setLocal(key: string, value: any): void {
  try {
    const data = JSON.stringify(value)
    localStorage.setItem(PREFIX + key, data)
  } catch (error) {
    console.error('setLocal error:', error)
  }
}

/**
 * 获取 localStorage
 */
export function getLocal<T = any>(key: string): T | null {
  try {
    const data = localStorage.getItem(PREFIX + key)
    if (data) {
      return JSON.parse(data) as T
    }
    return null
  } catch (error) {
    console.error('getLocal error:', error)
    return null
  }
}

/**
 * 删除 localStorage
 */
export function removeLocal(key: string): void {
  localStorage.removeItem(PREFIX + key)
}

/**
 * 清空 localStorage
 */
export function clearLocal(): void {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key)
    }
  })
}

/**
 * 设置 sessionStorage
 */
export function setSession(key: string, value: any): void {
  try {
    const data = JSON.stringify(value)
    sessionStorage.setItem(PREFIX + key, data)
  } catch (error) {
    console.error('setSession error:', error)
  }
}

/**
 * 获取 sessionStorage
 */
export function getSession<T = any>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(PREFIX + key)
    if (data) {
      return JSON.parse(data) as T
    }
    return null
  } catch (error) {
    console.error('getSession error:', error)
    return null
  }
}

/**
 * 删除 sessionStorage
 */
export function removeSession(key: string): void {
  sessionStorage.removeItem(PREFIX + key)
}

/**
 * 清空 sessionStorage
 */
export function clearSession(): void {
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith(PREFIX)) {
      sessionStorage.removeItem(key)
    }
  })
}

