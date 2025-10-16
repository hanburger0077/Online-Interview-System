import { Http } from './http'

export interface PageParams {
  page: number
  pageSize: number
}

export interface RoomFormData {
  title: string
  interviewerId: string
  capacity: number
  startAt: string
  endAt: string
  isRecording: boolean
}

export function createRoom(data: RoomFormData) {
  return Http.post('/admin/rooms', data)
}

export function updateRoom(roomId: string, data: Partial<RoomFormData>) {
  return Http.patch(`/admin/rooms/${roomId}`, data)
}

export function getRooms(params: PageParams) {
  return Http.get<any>('/admin/rooms', params)
}

export function deleteRoom(roomId: string) {
  return Http.delete(`/admin/rooms/${roomId}`)
}

export function getRecordings(params: { sessionId?: string } & PageParams) {
  return Http.get<any>('/admin/recordings', params)
}

export function publishResults(data: any[]) {
  return Http.post<{ success: boolean; count: number }>('/admin/result/publish', data)
}

export function getResults(params: PageParams) {
  return Http.get<any>('/admin/results', params)
}

export function sendNotice(data: {
  userIds: string[]
  title: string
  content: string
  type?: string
}) {
  return Http.post('/admin/notices', data)
}

export function getNotices(params: PageParams) {
  return Http.get<any>('/admin/notices', params)
}
