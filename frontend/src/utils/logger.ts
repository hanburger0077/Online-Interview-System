/**
 * 日志工具
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogConfig {
  level: LogLevel
  enableConsole: boolean
  enableRemote: boolean
  remoteUrl?: string
}

class Logger {
  private config: LogConfig = {
    level: LogLevel.INFO,
    enableConsole: true,
    enableRemote: false,
  }

  configure(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config }
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args)
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args)
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args)
  }

  error(message: string, error?: Error, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, error, ...args)
  }

  private log(level: LogLevel, message: string, ...args: any[]): void {
    // 级别过滤
    if (level < this.config.level) {
      return
    }

    const timestamp = new Date().toISOString()
    const levelName = LogLevel[level]

    // 控制台输出
    if (this.config.enableConsole) {
      const consoleMethod = this.getConsoleMethod(level)
      consoleMethod(`[${timestamp}] [${levelName}] ${message}`, ...args)
    }

    // 远程上报（可选）
    if (this.config.enableRemote && this.config.remoteUrl) {
      this.sendToRemote({
        level: levelName,
        message,
        timestamp,
        args,
        userAgent: navigator.userAgent,
        url: window.location.href,
      })
    }
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug
      case LogLevel.INFO:
        return console.info
      case LogLevel.WARN:
        return console.warn
      case LogLevel.ERROR:
        return console.error
      default:
        return console.log
    }
  }

  private sendToRemote(data: any): void {
    // 异步上报，不阻塞主流程
    try {
      if (navigator.sendBeacon && this.config.remoteUrl) {
        navigator.sendBeacon(this.config.remoteUrl, JSON.stringify(data))
      }
    } catch (error) {
      console.error('Failed to send log to remote:', error)
    }
  }
}

export const logger = new Logger()

