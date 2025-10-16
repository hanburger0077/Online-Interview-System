# 面试系统前端 - 基础设施

> 本项目基础设施由基础设施团队搭建完成，包含工程脚手架、代码规范、路由守卫、HTTP 封装、Mock 系统、构建配置等。

## 📦 技术栈

- **框架**: Vue 3.5 + TypeScript
- **构建工具**: Vite 7.x
- **路由**: Vue Router 4.x
- **状态管理**: Pinia 3.x
- **UI 框架**: Element Plus 2.x
- **HTTP 客户端**: Axios
- **Mock**: vite-plugin-mock + mockjs
- **代码规范**: ESLint + Prettier

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问：http://localhost:3000

### 代码检查
```bash
npm run lint      # 检查并修复代码
npm run format    # 格式化代码
```

### 构建生产
```bash
npm run build     # 构建生产环境
npm run preview   # 预览构建产物
./deploy.sh       # 一键部署脚本（包含检查、构建、提示）
```

## 📁 项目结构

```
frontend/
├── src/
│   ├── api/                # API 接口封装
│   │   ├── http.ts         # Axios 封装（已完成）
│   │   ├── auth.ts         # 认证接口（已完成）
│   │   ├── interview.ts    # 面试接口（已完成）
│   │   ├── admin.ts        # 管理接口（已完成）
│   │   └── audit.ts        # 审计接口（已完成）
│   ├── router/             # 路由配置
│   │   ├── index.ts        # 路由定义（已完成）
│   │   └── guards.ts       # 路由守卫（已完成）
│   ├── config/             # 配置文件
│   │   └── index.ts        # 全局配置（已完成）
│   ├── utils/              # 工具函数
│   │   ├── storage.ts      # 本地存储（已完成）
│   │   ├── time.ts         # 时间工具（已完成）
│   │   ├── security.ts     # 安全工具（已完成）
│   │   ├── validator.ts    # 验证工具（已完成）
│   │   ├── anti-cheat.ts   # 切屏检测（已完成）
│   │   ├── logger.ts       # 日志系统（已完成）
│   │   ├── monitor.ts      # 监控埋点（已完成）
│   │   └── safe-render.ts  # 安全渲染（已完成）
│   ├── views/              # 页面组件（待应用层实现）
│   ├── components/         # 公共组件（待应用层实现）
│   ├── stores/             # Pinia Store（待应用层实现）
│   ├── types/              # 类型定义（待应用层实现）
│   ├── styles/             # 全局样式
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── mock/                   # Mock 数据
│   ├── auth.ts             # 认证 Mock（已完成）
│   ├── interview.ts        # 面试 Mock（已完成）
│   └── admin.ts            # 管理 Mock（已完成）
├── .env.development        # 开发环境配置
├── .env.production         # 生产环境配置
├── .eslintrc.cjs           # ESLint 配置
├── .prettierrc.json        # Prettier 配置
├── .lintstagedrc.json      # lint-staged 配置
├── .editorconfig           # 编辑器配置
├── .husky.example/         # Git Hooks 示例（可选启用）
├── nginx.conf.example      # Nginx 配置样例
├── Dockerfile.example      # Docker 配置样例
├── deploy.sh               # 部署脚本
├── vite.config.ts          # Vite 配置
└── package.json            # 项目依赖
```

## 🛠 基础设施使用指南

### 1. HTTP 请求

```typescript
import { Http } from '@/api/http'

// GET 请求
const data = await Http.get('/api/users', { page: 1 })

// POST 请求
const result = await Http.post('/api/login', { username, password })

// 文件上传
await Http.upload('/api/upload', file, (progress) => {
  console.log('上传进度:', progress)
})

// 文件下载
await Http.download('/api/download', 'filename.pdf')
```

### 2. 路由守卫

路由守卫已配置，支持：
- ✅ 登录验证（`requireAuth: true`）
- ✅ 角色权限（`roles: ['admin', 'candidate']`）
- ✅ 时间窗口检查（`requireTimeWindow: true`）

**使用方式**：在路由 `meta` 中配置

```typescript
{
  path: '/admin',
  meta: {
    title: '管理后台',
    requireAuth: true,
    roles: ['admin']
  }
}
```

### 3. 环境变量

开发环境（`.env.development`）：
- `VITE_USE_MOCK=true` - 启用 Mock 数据
- `VITE_DEBUG=true` - 开启调试模式

生产环境（`.env.production`）：
- `VITE_USE_MOCK=false` - 关闭 Mock
- `VITE_API_BASE_URL` - 配置实际 API 地址

### 4. Mock 数据

开发模式下自动启用 Mock，Mock 文件位于 `mock/` 目录。

**默认测试账户**：
- 管理员: `admin` / `123456`
- 面试官: `teacher` / `123456`
- 考生: `student` / `123456`

### 5. 工具函数

```typescript
import { 
  setLocal, getLocal,           // 本地存储
  formatTime, getRelativeTime,  // 时间工具
  escapeHtml, maskPhone,        // 安全工具
  isEmail, isPhone,             // 验证工具
  antiCheatGuard,               // 切屏检测
  logger,                       // 日志系统
  monitor, trackPageView,       // 监控埋点
  safeRender, safeText,         // 安全渲染
} from '@/utils'

// 本地存储
setLocal('user', { name: '张三' })
const user = getLocal('user')

// 时间格式化
const time = formatTime(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 切屏检测（面试场景）
antiCheatGuard.start('sessionId', (event) => {
  console.log('检测到切屏:', event)
})

// 日志记录
logger.info('用户登录成功')
logger.error('请求失败', error)

// 监控埋点
trackPageView('/dashboard')
monitor.trackClick('btn-submit', '提交按钮')

// 安全渲染 HTML
const safeHtml = safeRender('<p>Hello <script>alert("xss")</script></p>')
// 或在模板中使用指令：<div v-safe-html="htmlContent"></div>
```

### 6. 代码规范

提交前会自动检查代码规范，手动检查：

```bash
npm run lint      # 自动修复
npm run format    # 格式化代码
```

**规范要点**：
- 使用 TypeScript，避免 `any`
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 单引号、无分号、2 空格缩进

## 🔐 安全特性

- ✅ Token 自动携带（Authorization Header）
- ✅ 401 自动跳转登录
- ✅ XSS 防护工具（`escapeHtml`, `safeRender`）
- ✅ 安全 HTML 渲染（标签白名单、属性过滤）
- ✅ 全局安全指令（`v-safe-html`）
- ✅ 切屏检测（`antiCheatGuard`）
- ✅ 敏感信息脱敏（`maskPhone`, `maskEmail`）

## 📊 构建优化

- ✅ 代码分包（Vue、Element Plus、工具库分离）
- ✅ 路由懒加载
- ✅ Gzip 压缩（生产环境）
- ✅ Tree Shaking
- ✅ CSS 代码分割
- ✅ 生产环境移除 console

## 📈 监控与埋点

- ✅ 页面访问自动埋点（路由切换）
- ✅ API 错误自动上报
- ✅ JS 错误自动捕获
- ✅ 性能数据监控
- ✅ 用户行为追踪
- ✅ 批量上报机制
- 开发环境控制台可见，生产环境自动上报

## 🚀 部署

### 方式 1：Nginx 静态部署
```bash
# 构建
npm run build

# 复制 dist/ 到服务器
# 使用 nginx.conf.example 配置 Nginx
```

### 方式 2：Docker 部署
```bash
# 构建镜像
docker build -t interview-frontend .

# 运行容器
docker run -p 80:80 interview-frontend
```

### 方式 3：一键部署脚本
```bash
./deploy.sh production
```

### Git Hooks（可选）

提供 Husky + lint-staged 配置，默认不启用。如需启用：

```bash
# 1. 安装 Husky
npm install -D husky
npx husky install

# 2. 复制配置
cp -r .husky.example .husky

# 3. 启用 hooks
npx husky add .husky/pre-commit "npx lint-staged"
```

启用后，每次提交代码会自动检查和格式化。

## 📝 待应用层实现

以下内容由**应用层成员**实现：

1. **页面组件**（`src/views/`）
   - 登录页、预约页、候场页、直播页等

2. **状态管理**（`src/stores/`）
   - authStore、interviewStore 等

3. **类型定义**（`src/types/`）
   - User、Session、Slot 等类型

4. **公共组件**（`src/components/`）
   - DeviceSelector、MediaTile 等

参考各目录下的 `README.md` 了解详细规范。

## 🤝 协作说明

### 基础设施团队职责（已完成）
- ✅ 工程脚手架
- ✅ 代码规范
- ✅ 路由框架与守卫
- ✅ HTTP 封装
- ✅ Mock 基础设施
- ✅ 工具函数库
- ✅ 构建配置
- ✅ 日志与监控

### 应用层团队职责（待实现）
- ⏳ 页面组件开发
- ⏳ 业务逻辑实现
- ⏳ 状态管理
- ⏳ 类型定义
- ⏳ UI/UX 设计

## 📞 联系方式

遇到基础设施相关问题，请联系基础设施团队。
