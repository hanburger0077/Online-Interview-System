# 面试系统前端 - 基础设施

本项目为面试系统前端的基础设施层，提供工程脚手架、代码规范、HTTP 封装、路由守卫、监控埋点等核心能力。

## 技术栈

- Vue 3.5 + TypeScript
- Vite 7.x
- Vue Router 4.x
- Pinia 3.x
- Element Plus 2.x
- Axios
- vite-plugin-mock + mockjs

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 代码检查
npm run lint

# 构建生产
npm run build

# 预览构建产物
npm run preview
```

访问：http://localhost:3000

## 项目结构

```
src/
├── api/              API 接口封装（已完成）
├── router/           路由配置与守卫（已完成）
├── config/           全局配置（已完成）
├── utils/            工具函数库（已完成）
├── views/            页面组件（待实现）
├── components/       公共组件（待实现）
├── stores/           状态管理（待实现）
└── types/            类型定义（待实现）

mock/                 Mock 数据（已完成）
.env.development      开发环境配置
.env.production       生产环境配置
nginx.conf.example    Nginx 配置样例
Dockerfile.example    Docker 配置样例
```

## 核心功能

### HTTP 请求

```typescript
import { Http } from '@/api/http'

// GET 请求
const data = await Http.get('/api/users', { page: 1 })

// POST 请求
const result = await Http.post('/api/login', { username, password })

// 文件上传
await Http.upload('/api/upload', file, progress => {
  console.log('上传进度:', progress)
})

// 文件下载
await Http.download('/api/download', 'filename.pdf')
```

特性：
- 统一错误处理
- Token 自动携带
- 请求/响应拦截
- 401 自动跳转登录
- API 错误自动上报

### 路由守卫

支持以下权限控制：
- 登录验证（`requireAuth: true`）
- 角色权限（`roles: ['admin', 'candidate']`）
- 时间窗口检查（`requireTimeWindow: true`）

使用示例：

```typescript
{
  path: '/admin',
  component: () => import('@/views/Admin.vue'),
  meta: {
    title: '管理后台',
    requireAuth: true,
    roles: ['admin']
  }
}
```

### 工具函数

```typescript
import {
  setLocal, getLocal,         // 本地存储
  formatTime,                 // 时间格式化
  escapeHtml, safeRender,     // XSS 防护
  isEmail, isPhone,           // 数据验证
  antiCheatGuard,             // 切屏检测
  logger,                     // 日志系统
  monitor, trackPageView,     // 监控埋点
} from '@/utils'

// 本地存储
setLocal('user', { name: '张三' })
const user = getLocal('user')

// 时间格式化
const time = formatTime(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 切屏检测
antiCheatGuard.start('sessionId', event => {
  console.log('检测到切屏:', event)
})

// 安全渲染 HTML
const safeHtml = safeRender('<p>内容</p>')
```

### Mock 数据

开发模式下自动启用 Mock，测试账户：

- 管理员：admin / 123456
- 面试官：teacher / 123456
- 考生：student / 123456

控制开关：`.env.development` 中 `VITE_USE_MOCK=true`

## 环境配置

开发环境（.env.development）：
```
VITE_USE_MOCK=true          # 启用 Mock
VITE_DEBUG=true             # 调试模式
VITE_API_BASE_URL=...       # API 地址
```

生产环境（.env.production）：
```
VITE_USE_MOCK=false         # 关闭 Mock
VITE_DEBUG=false            # 关闭调试
VITE_API_BASE_URL=...       # 生产 API 地址
```

## 代码规范

```bash
npm run lint      # ESLint 检查并修复
npm run format    # Prettier 格式化
```

规范要点：
- 使用 TypeScript，避免 any
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 单引号、无分号、2 空格缩进

## 安全特性

- Token 自动携带（Authorization Header）
- 401 自动跳转登录
- XSS 防护（escapeHtml, safeRender）
- 安全 HTML 渲染（标签白名单、属性过滤）
- 全局安全指令（v-safe-html）
- 切屏检测（antiCheatGuard）
- 敏感信息脱敏（maskPhone, maskEmail）

## 构建优化

- 代码分包（Vue、Element Plus、工具库分离）
- 路由懒加载
- 资源压缩（Gzip、Terser）
- Tree Shaking
- CSS 代码分割
- 生产环境移除 console

## 监控埋点

- 页面访问自动埋点（路由切换）
- API 错误自动上报
- JS 错误自动捕获
- 性能数据监控
- 用户行为追踪
- 批量上报机制

开发环境数据在控制台可见，生产环境自动上报到服务器。

## 部署

### Nginx 静态部署

```bash
npm run build
# 将 dist/ 目录上传到服务器
# 使用 nginx.conf.example 配置 Nginx
```

### Docker 部署

```bash
docker build -t interview-frontend .
docker run -p 80:80 interview-frontend
```

### 一键部署

```bash
./deploy.sh production
```

## Git Hooks（可选）

默认不启用，如需启用提交前自动检查：

```bash
npm install -D husky
npx husky install
cp -r .husky.example .husky
npx husky add .husky/pre-commit "npx lint-staged"
```

## 目录说明

- `src/api/` - HTTP 封装与接口定义
- `src/router/` - 路由配置与守卫逻辑
- `src/config/` - 全局配置管理
- `src/utils/` - 工具函数库
- `mock/` - Mock 数据定义

详细说明请查看各目录下的 README.md 文件。

## 待实现功能

以下由应用层团队实现：

- `src/views/` - 页面组件
- `src/components/` - 业务组件
- `src/stores/` - Pinia 状态管理
- `src/types/` - TypeScript 类型定义

## 相关文档

- ARCHITECTURE.md - 架构设计说明
- src/views/README.md - 页面组件开发规范
- src/stores/README.md - 状态管理规范
- src/types/README.md - 类型定义规范
- src/components/README.md - 组件开发规范
