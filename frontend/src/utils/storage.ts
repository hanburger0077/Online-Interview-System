const PREFIX = 'interview_system_'

export function setLocal(key: string, value: any): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    console.error('setLocal error:', error)
  }
}

export function getLocal<T = any>(key: string): T | null {
  try {
    const data = localStorage.getItem(PREFIX + key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('getLocal error:', error)
    return null
  }
}

export function removeLocal(key: string): void {
  localStorage.removeItem(PREFIX + key)
}

export function clearLocal(): void {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(PREFIX)) {
      localStorage.removeItem(key)
    }
  })
}

export function setSession(key: string, value: any): void {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    console.error('setSession error:', error)
  }
}

export function getSession<T = any>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(PREFIX + key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('getSession error:', error)
    return null
  }
}

export function removeSession(key: string): void {
  sessionStorage.removeItem(PREFIX + key)
}

export function clearSession(): void {
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith(PREFIX)) {
      sessionStorage.removeItem(key)
    }
  })
}
