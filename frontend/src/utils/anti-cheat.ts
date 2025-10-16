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

  constructor() {
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    this.handleWindowBlur = this.handleWindowBlur.bind(this)
    this.handleDocumentBlur = this.handleDocumentBlur.bind(this)
  }

  start(sessionId: string, callback?: AntiCheatCallback): void {
    if (this.isEnabled) return

    this.sessionId = sessionId
    this.isEnabled = true
    this.blurCount = 0

    if (callback) {
      this.callbacks.push(callback)
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    window.addEventListener('blur', this.handleWindowBlur)
    document.addEventListener('blur', this.handleDocumentBlur, true)
  }

  stop(): void {
    if (!this.isEnabled) return

    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    window.removeEventListener('blur', this.handleWindowBlur)
    document.removeEventListener('blur', this.handleDocumentBlur, true)

    this.isEnabled = false
    this.callbacks = []
    this.sessionId = null
  }

  onDetect(callback: AntiCheatCallback): () => void {
    this.callbacks.push(callback)
    return () => {
      const index = this.callbacks.indexOf(callback)
      if (index > -1) {
        this.callbacks.splice(index, 1)
      }
    }
  }

  getStats() {
    return {
      blurCount: this.blurCount,
      lastBlurTime: this.lastBlurTime,
      isEnabled: this.isEnabled,
    }
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      this.recordEvent({
        type: 'VISIBILITY_CHANGE',
        timestamp: Date.now(),
        sessionId: this.sessionId || undefined,
      })
    }
  }

  private handleWindowBlur(): void {
    this.recordEvent({
      type: 'WINDOW_BLUR',
      timestamp: Date.now(),
      sessionId: this.sessionId || undefined,
    })
  }

  private handleDocumentBlur(e: FocusEvent): void {
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

    this.recordEvent({
      type: 'TAB_BLUR',
      timestamp: Date.now(),
      sessionId: this.sessionId || undefined,
    })
  }

  private recordEvent(event: AntiCheatEvent): void {
    this.blurCount++
    this.lastBlurTime = event.timestamp

    this.callbacks.forEach(cb => {
      try {
        cb(event)
      } catch (error) {
        console.error('[AntiCheat] Callback error:', error)
      }
    })
  }
}

export const antiCheatGuard = new AntiCheatGuard()
