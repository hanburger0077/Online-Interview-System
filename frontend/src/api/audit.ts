/**
 * 审计相关 API
 */
import { Http } from './http'

/**
 * 切屏事件数据
 */
export interface AntiCheatEventData {
  type: 'TAB_BLUR' | 'WINDOW_BLUR' | 'VISIBILITY_CHANGE'
  at: number
  sessionId: string
}

/**
 * 上报切屏事件
 */
export function reportAntiCheatEvent(data: AntiCheatEventData) {
  return Http.post('/audit/anti-cheat', data)
}

/**
 * 获取切屏记录
 */
export function getAntiCheatLogs(sessionId: string) {
  return Http.get<AntiCheatEventData[]>(`/audit/anti-cheat/${sessionId}`)
}

