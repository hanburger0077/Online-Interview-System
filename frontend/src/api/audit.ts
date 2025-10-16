import { Http } from './http'

export interface AntiCheatEventData {
  type: 'TAB_BLUR' | 'WINDOW_BLUR' | 'VISIBILITY_CHANGE'
  at: number
  sessionId: string
}

export function reportAntiCheatEvent(data: AntiCheatEventData) {
  return Http.post('/audit/anti-cheat', data)
}

export function getAntiCheatLogs(sessionId: string) {
  return Http.get<AntiCheatEventData[]>(`/audit/anti-cheat/${sessionId}`)
}
