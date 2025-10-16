## 技术栈

Vue 3.5 + TypeScript + Vite + Pinia + Element Plus + Axios

## 快速开始

```bash
npm install    # 安装依赖
npm run dev    # 开发模式（http://localhost:3000）
npm run build  # 构建生产
npm run lint   # 代码检查
```

## 项目结构

```
src/
├── api/         HTTP 封装与接口（已完成）
├── router/      路由配置与守卫（已完成）
├── config/      全局配置（已完成）
├── utils/       工具函数库（已完成）
├── views/       页面组件（待实现）
├── stores/      状态管理（待实现）
└── types/       类型定义（待实现）
```

## 核心功能

### HTTP 请求

```typescript
import { Http } from '@/api/http'

await Http.get('/api/users', { page: 1 })
await Http.post('/api/login', { username, password })
await Http.upload('/api/upload', file, progress => {})
await Http.download('/api/download', 'filename.pdf')
```

### 路由守卫

```typescript
{
  path: '/admin',
  meta: {
    requireAuth: true,      // 需要登录
    roles: ['admin'],       // 角色限制
    requireTimeWindow: true // 时间窗口检查
  }
}
```

### 工具函数

```typescript
import {
  setLocal, getLocal,          // 本地存储
  formatTime,                  // 时间格式化
  safeRender,                  // XSS 防护
  antiCheatGuard,              // 切屏检测
  logger, monitor,             // 日志监控
} from '@/utils'
```

### Mock 数据

测试账户：admin/teacher/student，密码：123456

控制：`.env.development` 中 `VITE_USE_MOCK=true`

## 环境配置

- `.env.development` - 开发环境（Mock 开启）
- `.env.production` - 生产环境（Mock 关闭）

## 代码规范

- ESLint + Prettier
- TypeScript 严格模式
- 单引号、无分号、2 空格缩进

## 部署

```bash
npm run build            # 构建
./deploy.sh production   # 一键部署
```

或使用 `nginx.conf.example` / `Dockerfile.example` 配置

