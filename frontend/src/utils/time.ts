/**
 * 时间工具函数
 */

/**
 * 格式化时间
 */
export function formatTime(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) {
    return ''
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 获取相对时间描述
 */
export function getRelativeTime(date: Date | string | number): string {
  const now = Date.now()
  const timestamp = new Date(date).getTime()
  const diff = now - timestamp

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`
  } else {
    return formatTime(date, 'YYYY-MM-DD')
  }
}

/**
 * 倒计时格式化（秒数转 HH:mm:ss）
 */
export function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
}

/**
 * 检查时间是否在指定窗口内
 */
export function isInTimeWindow(
  start: Date | string,
  end: Date | string,
  now = new Date()
): boolean {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  const nowTime = now.getTime()

  return nowTime >= startTime && nowTime <= endTime
}

/**
 * 检查是否可以进入候场（提前10分钟）
 */
export function canEnterLobby(startTime: Date | string, advanceMinutes = 10): boolean {
  const start = new Date(startTime).getTime()
  const now = Date.now()
  const advance = advanceMinutes * 60 * 1000

  return now >= start - advance && now < start + 3600 * 1000 // 提前10分钟到开始后1小时
}
