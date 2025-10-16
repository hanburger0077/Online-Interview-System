/**
 * 路由配置框架
 * 
 * 说明：
 * 此文件提供路由的基础框架和权限配置
 * 具体的页面组件由应用层成员实现
 * 
 * TODO: 由应用层成员添加具体的页面组件
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

/**
 * 路由元信息类型扩展
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requireAuth?: boolean
    roles?: string[]
    requireTimeWindow?: boolean
  }
}

/**
 * 基础路由配置（示例）
 * 
 * 注意：以下路由配置仅为框架示例
 * 实际的页面组件需要由应用层成员实现
 * 
 * 使用方式：
 * 1. 在 src/views/ 目录创建对应的 .vue 文件
 * 2. 取消下方路由的注释
 * 3. 路由守卫会自动生效
 */
const routes: RouteRecordRaw[] = [
  // 示例：首页（待实现）
  // {
  //   path: '/',
  //   name: 'Landing',
  //   component: () => import('@/views/Landing.vue'),
  //   meta: { title: '首页' },
  // },
  
  // 示例：登录页（待实现）
  // {
  //   path: '/auth/login',
  //   name: 'Login',
  //   component: () => import('@/views/Auth/Login.vue'),
  //   meta: { title: '登录' },
  // },
  
  // 示例：控制台（待实现）
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/Dashboard.vue'),
  //   meta: { title: '控制台', requireAuth: true },
  // },
  
  // 考生路由（待实现）
  // {
  //   path: '/interview',
  //   name: 'Interview',
  //   redirect: '/interview/schedule',
  //   meta: { requireAuth: true, roles: ['candidate'] },
  //   children: [
  //     {
  //       path: 'schedule',
  //       name: 'InterviewSchedule',
  //       component: () => import('@/views/Interview/Schedule.vue'),
  //       meta: { title: '预约面试', requireAuth: true, roles: ['candidate'] },
  //     },
  //     {
  //       path: 'my',
  //       name: 'MyReservations',
  //       component: () => import('@/views/Interview/MyReservations.vue'),
  //       meta: { title: '我的预约', requireAuth: true, roles: ['candidate'] },
  //     },
  //     {
  //       path: 'lobby/:sessionId',
  //       name: 'InterviewLobby',
  //       component: () => import('@/views/Interview/Lobby.vue'),
  //       meta: { title: '候场', requireAuth: true, roles: ['candidate'], requireTimeWindow: true },
  //     },
  //     {
  //       path: 'live/:sessionId',
  //       name: 'InterviewLive',
  //       component: () => import('@/views/Interview/Live.vue'),
  //       meta: { title: '面试中', requireAuth: true, roles: ['candidate'], requireTimeWindow: true },
  //     },
  //     {
  //       path: 'result',
  //       name: 'InterviewResult',
  //       component: () => import('@/views/Interview/Result.vue'),
  //       meta: { title: '成绩查询', requireAuth: true, roles: ['candidate'] },
  //     },
  //   ],
  // },
  
  // 面试官路由（待实现）
  // {
  //   path: '/reviewer',
  //   name: 'Reviewer',
  //   redirect: '/reviewer/agenda',
  //   meta: { requireAuth: true, roles: ['interviewer'] },
  //   children: [
  //     {
  //       path: 'agenda',
  //       name: 'ReviewerAgenda',
  //       component: () => import('@/views/Reviewer/Agenda.vue'),
  //       meta: { title: '我的日程', requireAuth: true, roles: ['interviewer'] },
  //     },
  //     {
  //       path: 'room/:sessionId',
  //       name: 'ReviewerRoom',
  //       component: () => import('@/views/Reviewer/Room.vue'),
  //       meta: { title: '面试房间', requireAuth: true, roles: ['interviewer'], requireTimeWindow: true },
  //     },
  //   ],
  // },
  
  // 管理员路由（待实现）
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   redirect: '/admin/rooms',
  //   meta: { requireAuth: true, roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'rooms',
  //       name: 'AdminRooms',
  //       component: () => import('@/views/Admin/Rooms.vue'),
  //       meta: { title: '房间管理', requireAuth: true, roles: ['admin'] },
  //     },
  //     {
  //       path: 'recordings',
  //       name: 'AdminRecordings',
  //       component: () => import('@/views/Admin/Recordings.vue'),
  //       meta: { title: '回放管理', requireAuth: true, roles: ['admin'] },
  //     },
  //     {
  //       path: 'publish',
  //       name: 'AdminPublish',
  //       component: () => import('@/views/Admin/Publish.vue'),
  //       meta: { title: '成绩发布', requireAuth: true, roles: ['admin'] },
  //     },
  //     {
  //       path: 'notices',
  //       name: 'AdminNotices',
  //       component: () => import('@/views/Admin/Notices.vue'),
  //       meta: { title: '站内信管理', requireAuth: true, roles: ['admin'] },
  //     },
  //   ],
  // },
  
  // 错误页面（待实现）
  // {
  //   path: '/403',
  //   name: 'Forbidden',
  //   component: () => import('@/views/Error/403.vue'),
  //   meta: { title: '无权限' },
  // },
  // {
  //   path: '/404',
  //   name: 'NotFound',
  //   component: () => import('@/views/Error/404.vue'),
  //   meta: { title: '页面不存在' },
  // },
  
  // 默认重定向（暂时注释，等待应用层实现）
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  // },
]

/**
 * 创建路由实例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

/**
 * 设置路由守卫
 */
setupRouterGuards(router)

export default router
