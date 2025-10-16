import { Http } from './http'

export function getAvailableSlots(params: { from?: string; to?: string; role?: string }) {
  return Http.get<any[]>('/interview/slots', params)
}

export function bookSlot(slotId: string) {
  return Http.post<{ success: boolean; reservationId: string }>(`/interview/slots/${slotId}/book`)
}

export function getMyReservations() {
  return Http.get<any[]>('/interview/my')
}

export function cancelReservation(reservationId: string) {
  return Http.delete(`/interview/reservations/${reservationId}`)
}

export function joinRoom(sessionId: string) {
  return Http.post<any>(`/room/${sessionId}/join`)
}

export function getRoomInfo(sessionId: string) {
  return Http.get<any>(`/room/${sessionId}`)
}

export function getRoomQuestions(sessionId: string) {
  return Http.get<Array<{ id: string; stem: string; attachments?: string[] }>>(
    `/room/${sessionId}/questions`
  )
}

export function endInterview(sessionId: string) {
  return Http.post(`/room/${sessionId}/end`)
}
