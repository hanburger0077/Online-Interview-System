import type { Router } from 'vue-router'
import { ROUTE_WHITE_LIST, APP_TITLE } from '@/config'
import { ElMessage } from 'element-plus'
import { logger } from '@/utils/logger'
import { trackPageView } from '@/utils/monitor'

export function setupRouterGuards(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE

    if (ROUTE_WHITE_LIST.includes(to.path)) {
      next()
      return
    }

    next()
  })

  router.afterEach((to, from) => {
    logger.debug(`路由跳转: ${from.path} -> ${to.path}`)
    trackPageView(to.path, {
      title: to.meta.title,
      from: from.path,
    })
  })

  router.onError(error => {
    logger.error('路由错误', error)
    ElMessage.error('页面加载失败，请刷新重试')
  })
}
