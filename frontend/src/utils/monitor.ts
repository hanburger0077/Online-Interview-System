/**
 * 监控与埋点系统
 * 
 * 功能：
 * - 页面访问埋点
 * - 用户行为追踪
 * - 异常上报
 * - 性能监控
 */

import { logger } from './logger'
import { appConfig } from '@/config'

/**
 * 埋点事件类型
 */
export enum TrackEventType {
  PAGE_VIEW = 'page_view',           // 页面访问
  CLICK = 'click',                   // 点击事件
  API_ERROR = 'api_error',           // API 错误
  JS_ERROR = 'js_error',             // JS 错误
  RESOURCE_ERROR = 'resource_error', // 资源加载错误
  PERFORMANCE = 'performance',       // 性能数据
}

/**
 * 埋点数据结构
 */
export interface TrackEvent {
  type: TrackEventType
  timestamp: number
  page?: string
  data?: any
  userId?: string
  sessionId?: string
}

/**
 * 监控类
 */
class Monitor {
  private queue: TrackEvent[] = []
  private sessionId: string = this.generateSessionId()
  private userId?: string
  private reportUrl?: string
  private batchSize = 10
  private batchTimeout = 5000
  private timer?: number

  constructor() {
    this.init()
  }

  /**
   * 初始化监控
   */
  private init() {
    // 读取上报地址
    this.reportUrl = appConfig.debug ? undefined : import.meta.env.VITE_MONITOR_URL

    // 监听全局错误
    this.setupErrorListeners()

    // 监听性能数据
    this.setupPerformanceObserver()

    // 页面卸载前上报
    this.setupBeforeUnload()

    logger.info('[Monitor] 监控系统已初始化', { sessionId: this.sessionId })
  }

  /**
   * 设置用户 ID
   */
  setUserId(userId: string) {
    this.userId = userId
  }

  /**
   * 页面访问埋点
   */
  trackPageView(page: string, extra?: any) {
    this.track({
      type: TrackEventType.PAGE_VIEW,
      timestamp: Date.now(),
      page,
      data: {
        title: document.title,
        referrer: document.referrer,
        ...extra,
      },
    })

    logger.debug(`[Monitor] 页面访问: ${page}`)
  }

  /**
   * 点击事件埋点
   */
  trackClick(elementId: string, elementText?: string, extra?: any) {
    this.track({
      type: TrackEventType.CLICK,
      timestamp: Date.now(),
      page: location.pathname,
      data: {
        elementId,
        elementText,
        ...extra,
      },
    })
  }

  /**
   * API 错误上报
   */
  trackApiError(url: string, status: number, message: string, extra?: any) {
    this.track({
      type: TrackEventType.API_ERROR,
      timestamp: Date.now(),
      page: location.pathname,
      data: {
        url,
        status,
        message,
        ...extra,
      },
    })

    logger.error('[Monitor] API 错误', new Error(`${url} ${status} ${message}`))
  }

  /**
   * JS 错误上报
   */
  trackJsError(error: Error | any, extra?: any) {
    this.track({
      type: TrackEventType.JS_ERROR,
      timestamp: Date.now(),
      page: location.pathname,
      data: {
        message: error?.message || String(error),
        stack: error?.stack,
        name: error?.name,
        ...extra,
      },
    })

    logger.error('[Monitor] JS 错误', error)
  }

  /**
   * 性能数据上报
   */
  trackPerformance(metrics: any) {
    this.track({
      type: TrackEventType.PERFORMANCE,
      timestamp: Date.now(),
      page: location.pathname,
      data: metrics,
    })

    logger.debug('[Monitor] 性能数据', metrics)
  }

  /**
   * 通用埋点方法
   */
  private track(event: Omit<TrackEvent, 'userId' | 'sessionId'>) {
    const fullEvent: TrackEvent = {
      ...event,
      userId: this.userId,
      sessionId: this.sessionId,
    }

    // 添加到队列
    this.queue.push(fullEvent)

    // 开发环境直接打印
    if (appConfig.debug) {
      console.log('[Monitor] 埋点事件:', fullEvent)
    }

    // 达到批量大小或超时则上报
    if (this.queue.length >= this.batchSize) {
      this.flush()
    } else {
      this.startTimer()
    }
  }

  /**
   * 启动定时器
   */
  private startTimer() {
    if (this.timer) return

    this.timer = window.setTimeout(() => {
      this.flush()
    }, this.batchTimeout)
  }

  /**
   * 立即上报
   */
  flush() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }

    if (this.queue.length === 0) return

    const events = [...this.queue]
    this.queue = []

    // 上报数据
    this.report(events)
  }

  /**
   * 上报数据
   */
  private report(events: TrackEvent[]) {
    if (!this.reportUrl) {
      // 没有配置上报地址，仅本地打印
      logger.debug('[Monitor] 埋点数据（未上报）:', events)
      return
    }

    // 使用 sendBeacon 或 fetch 上报
    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(this.reportUrl, JSON.stringify(events))
      if (!success) {
        logger.warn('[Monitor] sendBeacon 上报失败')
      }
    } else {
      fetch(this.reportUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
        keepalive: true,
      }).catch(error => {
        logger.error('[Monitor] 上报失败', error)
      })
    }
  }

  /**
   * 监听全局错误
   */
  private setupErrorListeners() {
    // JS 错误
    window.addEventListener('error', event => {
      if (event.error) {
        this.trackJsError(event.error, {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        })
      }
    })

    // Promise 未捕获错误
    window.addEventListener('unhandledrejection', event => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason))
      this.trackJsError(error, {
        type: 'unhandledrejection',
      })
    })

    // 资源加载错误
    window.addEventListener(
      'error',
      event => {
        const target = event.target as HTMLElement
        if (target && target.tagName) {
          this.track({
            type: TrackEventType.RESOURCE_ERROR,
            timestamp: Date.now(),
            page: location.pathname,
            data: {
              tagName: target.tagName,
              src: (target as any).src || (target as any).href,
            },
          })
        }
      },
      true
    )
  }

  /**
   * 监听性能数据
   */
  private setupPerformanceObserver() {
    if (!window.PerformanceObserver) return

    try {
      // 监听页面加载性能
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = performance.timing
          const metrics = {
            // DNS 查询耗时
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            // TCP 连接耗时
            tcp: timing.connectEnd - timing.connectStart,
            // 请求耗时
            request: timing.responseEnd - timing.requestStart,
            // DOM 解析耗时
            domParse: timing.domInteractive - timing.domLoading,
            // 资源加载耗时
            resourceLoad: timing.loadEventStart - timing.domContentLoadedEventEnd,
            // 首屏时间
            firstPaint: timing.responseEnd - timing.fetchStart,
            // 总加载时间
            loadComplete: timing.loadEventEnd - timing.fetchStart,
          }

          this.trackPerformance(metrics)
        }, 0)
      })
    } catch (error) {
      logger.warn('[Monitor] 性能监控初始化失败', error)
    }
  }

  /**
   * 页面卸载前上报
   */
  private setupBeforeUnload() {
    window.addEventListener('beforeunload', () => {
      this.flush()
    })

    // 页面隐藏时也上报
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flush()
      }
    })
  }

  /**
   * 生成 Session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

/**
 * 导出单例
 */
export const monitor = new Monitor()

/**
 * 便捷方法导出
 */
export const trackPageView = monitor.trackPageView.bind(monitor)
export const trackClick = monitor.trackClick.bind(monitor)
export const trackApiError = monitor.trackApiError.bind(monitor)
export const trackJsError = monitor.trackJsError.bind(monitor)

