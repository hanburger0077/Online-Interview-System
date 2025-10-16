import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupRouterGuards } from './guards'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requireAuth?: boolean
    roles?: string[]
    requireTimeWindow?: boolean
  }
}

const routes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

setupRouterGuards(router)

export default router
