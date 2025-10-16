/**
 * 防作弊工具 - 切屏检测
 */

export interface AntiCheatEvent {
  type: 'TAB_BLUR' | 'WINDOW_BLUR' | 'VISIBILITY_CHANGE'
  timestamp: number
  sessionId?: string
}

export type AntiCheatCallback = (event: AntiCheatEvent) => void

class AntiCheatGuard {
  private callbacks: AntiCheatCallback[] = []
  private sessionId: string | null = null
  private isEnabled = false
  private blurCount = 0
  private lastBlurTime = 0

  /**
   * 启动监控
   */
  start(sessionId: string, callback?: AntiCheatCallback): void {
    if (this.isEnabled) {
      console.warn('AntiCheatGuard is already running')
      return
    }

    this.sessionId = sessionId
    this.isEnabled = true
    this.blurCount = 0

    if (callback) {
      this.callbacks.push(callback)
    }

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', this.handleVisibilityChange)

    // 监听窗口失焦
    window.addEventListener('blur', this.handleWindowBlur)

    // 监听标签页切换
    document.addEventListener('blur', this.handleDocumentBlur, true)

    console.log(`[AntiCheat] 监控已启动，sessionId: ${sessionId}`)
  }

  /**
   * 停止监控
   */
  stop(): void {
    if (!this.isEnabled) {
      return
    }

    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    window.removeEventListener('blur', this.handleWindowBlur)
    document.removeEventListener('blur', this.handleDocumentBlur, true)

    this.isEnabled = false
    this.callbacks = []
    this.sessionId = null

    console.log('[AntiCheat] 监控已停止')
  }

  /**
   * 添加回调
   */
  onDetect(callback: AntiCheatCallback): () => void {
    this.callbacks.push(callback)
    // 返回取消订阅函数
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }

  /**
   * 获取统计信息
   */
  getStats() {
    return {
      blurCount: this.blurCount,
      lastBlurTime: this.lastBlurTime,
      isEnabled: this.isEnabled,
    }
  }

  /**
   * 处理页面可见性变化
   */
  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      this.recordEvent({
        type: 'VISIBILITY_CHANGE',
        timestamp: Date.now(),
        sessionId: this.sessionId || undefined,
      })
    }
  }

  /**
   * 处理窗口失焦
   */
  private handleWindowBlur = (): void => {
    this.recordEvent({
      type: 'WINDOW_BLUR',
      timestamp: Date.now(),
      sessionId: this.sessionId || undefined,
    })
  }

  /**
   * 处理文档失焦（捕获阶段）
   */
  private handleDocumentBlur = (e: FocusEvent): void => {
    // 排除输入框失焦
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return
    }

    this.recordEvent({
      type: 'TAB_BLUR',
      timestamp: Date.now(),
      sessionId: this.sessionId || undefined,
    })
  }

  /**
   * 记录事件
   */
  private recordEvent(event: AntiCheatEvent): void {
    this.blurCount++
    this.lastBlurTime = event.timestamp

    // 通知所有回调
    this.callbacks.forEach(cb => {
      try {
        cb(event)
      } catch (error) {
        console.error('[AntiCheat] Callback error:', error)
      }
    })
  }
}

// 单例导出
export const antiCheatGuard = new AntiCheatGuard()

