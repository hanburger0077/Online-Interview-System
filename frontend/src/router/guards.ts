/**
 * 路由守卫框架
 * 
 * 说明：
 * 此文件提供路由守卫的基础框架，具体的认证逻辑需要对接 Pinia Store
 * 
 * TODO: 
 * - 对接 useAuthStore 进行认证检查
 * - 对接 API 进行时间窗口检查
 */
import type { Router } from 'vue-router'
import { ROUTE_WHITE_LIST, APP_TITLE } from '@/config'
import { ElMessage } from 'element-plus'
import { logger } from '@/utils/logger'
import { trackPageView } from '@/utils/monitor'

/**
 * 设置路由守卫
 */
export function setupRouterGuards(router: Router): void {
  // 前置守卫
  router.beforeEach(async (to, from, next) => {
    // 设置页面标题
    document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE

    // 白名单直接放行
    if (ROUTE_WHITE_LIST.includes(to.path)) {
      next()
      return
    }

    // TODO: 检查是否需要登录
    if (to.meta.requireAuth) {
      // TODO: 从 authStore 获取登录状态
      // const authStore = useAuthStore()
      // if (!authStore.isAuthenticated) {
      //   logger.warn('未登录，重定向到登录页')
      //   ElMessage.warning('请先登录')
      //   next({ path: '/auth/login', query: { redirect: to.fullPath } })
      //   return
      // }

      // TODO: 检查角色权限
      // if (to.meta.roles && to.meta.roles.length > 0) {
      //   const hasRole = to.meta.roles.includes(authStore.user?.role as any)
      //   if (!hasRole) {
      //     logger.warn(`权限不足，需要角色: ${to.meta.roles.join(',')}`)
      //     ElMessage.error('您没有权限访问此页面')
      //     next('/403')
      //     return
      //   }
      // }

      // TODO: 检查时间窗口（针对面试房间）
      // if (to.meta.requireTimeWindow && to.params.sessionId) {
      //   const canEnter = await checkTimeWindow(to.params.sessionId as string)
      //   if (!canEnter) {
      //     logger.warn(`不在时间窗口内，sessionId: ${to.params.sessionId}`)
      //     ElMessage.warning('当前不在可进入的时间范围内')
      //     next(from.path || '/dashboard')
      //     return
      //   }
      // }
    }

    next()
  })

  // 后置守卫
  router.afterEach((to, from) => {
    // 记录路由跳转日志
    logger.debug(`路由跳转: ${from.path} -> ${to.path}`)

    // 页面访问埋点
    trackPageView(to.path, {
      title: to.meta.title,
      from: from.path,
    })
  })

  // 错误处理
  router.onError(error => {
    logger.error('路由错误', error)
    ElMessage.error('页面加载失败，请刷新重试')
  })
}

/**
 * 检查时间窗口（待实现）
 * 
 * TODO: 调用 API 检查场次时间
 */
async function checkTimeWindow(_sessionId: string): Promise<boolean> {
  // 暂时返回 true，等待对接 API
  return true
}
