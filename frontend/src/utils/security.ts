/**
 * 安全工具函数
 */

/**
 * XSS 防护：HTML 转义
 */
export function escapeHtml(html: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  return html.replace(/[&<>"'/]/g, char => map[char] || char)
}

/**
 * 简单加密（用于非敏感数据）
 */
export function simpleEncrypt(text: string): string {
  return btoa(encodeURIComponent(text))
}

/**
 * 简单解密
 */
export function simpleDecrypt(encrypted: string): string {
  try {
    return decodeURIComponent(atob(encrypted))
  } catch {
    return ''
  }
}

/**
 * 脱敏处理 - 手机号
 */
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 脱敏处理 - 邮箱
 */
export function maskEmail(email: string): string {
  return email.replace(/(.{2}).*(@.*)/, '$1***$2')
}

/**
 * 脱敏处理 - 姓名（保留姓）
 */
export function maskName(name: string): string {
  if (name.length <= 1) return name
  return name[0] + '*'.repeat(name.length - 1)
}

/**
 * 验证是否为有效的 Token
 */
export function isValidToken(token: string): boolean {
  return typeof token === 'string' && token.length > 0
}

/**
 * 生成随机字符串（用于临时ID等）
 */
export function generateRandomString(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
