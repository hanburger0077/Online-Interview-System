/**
 * 安全渲染工具
 * 防止 XSS 攻击
 */

import { escapeHtml } from './security'

/**
 * 允许的 HTML 标签白名单
 */
const ALLOWED_TAGS = [
  'p',
  'br',
  'span',
  'div',
  'strong',
  'em',
  'b',
  'i',
  'u',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'a',
  'img',
  'pre',
  'code',
  'blockquote',
]

/**
 * 允许的属性白名单
 */
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'title', 'target'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  '*': ['class', 'style'], // 所有标签都允许的属性
}

/**
 * 安全渲染 HTML
 *
 * @param html - 原始 HTML 字符串
 * @param options - 配置选项
 * @returns 安全的 HTML 字符串
 *
 * @example
 * ```typescript
 * const safeHtml = safeRender('<p>Hello <script>alert("xss")</script></p>')
 * // 输出: <p>Hello </p>
 * ```
 */
export function safeRender(
  html: string,
  options: {
    allowedTags?: string[]
    allowedAttrs?: Record<string, string[]>
  } = {}
): string {
  const allowedTags = options.allowedTags || ALLOWED_TAGS
  const allowedAttrs = options.allowedAttrs || ALLOWED_ATTRS

  // 创建临时 DOM 解析
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // 递归清理节点
  function sanitizeNode(node: Node): Node | null {
    // 文本节点直接返回
    if (node.nodeType === Node.TEXT_NODE) {
      return node
    }

    // 非元素节点移除
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null
    }

    const element = node as Element
    const tagName = element.tagName.toLowerCase()

    // 不在白名单的标签，只保留其文本内容
    if (!allowedTags.includes(tagName)) {
      const textNode = document.createTextNode(element.textContent || '')
      return textNode
    }

    // 清理属性
    const allowedAttrsForTag = [...(allowedAttrs[tagName] || []), ...(allowedAttrs['*'] || [])]

    const attributes = Array.from(element.attributes)
    attributes.forEach(attr => {
      if (!allowedAttrsForTag.includes(attr.name)) {
        element.removeAttribute(attr.name)
      } else {
        // 特殊处理 href 防止 javascript: 协议
        if (attr.name === 'href') {
          const href = attr.value.trim().toLowerCase()
          if (
            href.startsWith('javascript:') ||
            href.startsWith('data:') ||
            href.startsWith('vbscript:')
          ) {
            element.removeAttribute('href')
          }
        }
        // 特殊处理 src 防止恶意资源
        if (attr.name === 'src') {
          const src = attr.value.trim().toLowerCase()
          if (src.startsWith('javascript:') || src.startsWith('data:text/html')) {
            element.removeAttribute('src')
          }
        }
      }
    })

    // 递归清理子节点
    const children = Array.from(element.childNodes)
    children.forEach(child => {
      const sanitizedChild = sanitizeNode(child)
      if (!sanitizedChild) {
        element.removeChild(child)
      }
    })

    return element
  }

  // 清理 body 中的所有节点
  const bodyChildren = Array.from(doc.body.childNodes)
  const sanitizedNodes: Node[] = []

  bodyChildren.forEach(node => {
    const sanitized = sanitizeNode(node)
    if (sanitized) {
      sanitizedNodes.push(sanitized)
    }
  })

  // 重新构建 HTML
  const tempDiv = document.createElement('div')
  sanitizedNodes.forEach(node => {
    tempDiv.appendChild(node.cloneNode(true))
  })

  return tempDiv.innerHTML
}

/**
 * 纯文本渲染（最安全）
 * 将所有 HTML 转义
 *
 * @example
 * ```typescript
 * const safe = safeText('<script>alert("xss")</script>')
 * // 输出: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
 * ```
 */
export function safeText(text: string): string {
  return escapeHtml(text)
}

/**
 * 安全渲染 Markdown（简化版）
 * 只支持基础格式
 */
export function safeMarkdown(markdown: string): string {
  let html = markdown
    // 转义 HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 代码
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // 换行
    .replace(/\n/g, '<br>')

  return html
}

/**
 * Vue 指令：v-safe-html
 *
 * 使用方式：
 * ```vue
 * <div v-safe-html="htmlContent"></div>
 * ```
 */
export const vSafeHtml = {
  mounted(el: HTMLElement, binding: any) {
    el.innerHTML = safeRender(binding.value || '')
  },
  updated(el: HTMLElement, binding: any) {
    el.innerHTML = safeRender(binding.value || '')
  },
}
