/**
 * 面试相关 API
 * 
 * 说明：
 * 接口类型定义待应用层成员补充
 */
import { Http } from './http'

/**
 * 获取可预约时段
 */
export function getAvailableSlots(params: { from?: string; to?: string; role?: string }) {
  return Http.get<any[]>('/interview/slots', params)
}

/**
 * 预约时段
 */
export function bookSlot(slotId: string) {
  return Http.post<{ success: boolean; reservationId: string }>(`/interview/slots/${slotId}/book`)
}

/**
 * 获取我的预约
 */
export function getMyReservations() {
  return Http.get<any[]>('/interview/my')
}

/**
 * 取消预约
 */
export function cancelReservation(reservationId: string) {
  return Http.delete(`/interview/reservations/${reservationId}`)
}

/**
 * 加入房间
 */
export function joinRoom(sessionId: string) {
  return Http.post<any>(`/room/${sessionId}/join`)
}

/**
 * 获取房间信息
 */
export function getRoomInfo(sessionId: string) {
  return Http.get<any>(`/room/${sessionId}`)
}

/**
 * 获取房间题目
 */
export function getRoomQuestions(sessionId: string) {
  return Http.get<Array<{ id: string; stem: string; attachments?: string[] }>>(
    `/room/${sessionId}/questions`
  )
}

/**
 * 结束面试
 */
export function endInterview(sessionId: string) {
  return Http.post(`/room/${sessionId}/end`)
}
