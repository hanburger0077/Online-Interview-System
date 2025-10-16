/**
 * 管理员相关 API
 * 
 * 说明：
 * 接口类型定义待应用层成员补充
 */
import { Http } from './http'

/**
 * 分页参数
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * 房间表单数据
 */
export interface RoomFormData {
  title: string
  interviewerId: string
  capacity: number
  startAt: string
  endAt: string
  isRecording: boolean
}

/**
 * 创建房间/场次
 */
export function createRoom(data: RoomFormData) {
  return Http.post('/admin/rooms', data)
}

/**
 * 更新房间
 */
export function updateRoom(roomId: string, data: Partial<RoomFormData>) {
  return Http.patch(`/admin/rooms/${roomId}`, data)
}

/**
 * 获取房间列表
 */
export function getRooms(params: PageParams) {
  return Http.get<any>('/admin/rooms', params)
}

/**
 * 删除房间
 */
export function deleteRoom(roomId: string) {
  return Http.delete(`/admin/rooms/${roomId}`)
}

/**
 * 获取回放列表
 */
export function getRecordings(params: { sessionId?: string } & PageParams) {
  return Http.get<any>('/admin/recordings', params)
}

/**
 * 发布成绩
 */
export function publishResults(data: any[]) {
  return Http.post<{ success: boolean; count: number }>('/admin/result/publish', data)
}

/**
 * 获取成绩列表
 */
export function getResults(params: PageParams) {
  return Http.get<any>('/admin/results', params)
}

/**
 * 发送站内信
 */
export function sendNotice(data: {
  userIds: string[]
  title: string
  content: string
  type?: string
}) {
  return Http.post('/admin/notices', data)
}

/**
 * 获取站内信列表
 */
export function getNotices(params: PageParams) {
  return Http.get<any>('/admin/notices', params)
}
