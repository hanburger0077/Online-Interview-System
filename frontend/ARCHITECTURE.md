# 项目架构说明

## 整体架构

```
应用层 (Views, Components, Stores)
    ↓
基础设施层 (Router, HTTP, Utils, Config)
    ↓
第三方库 (Vue 3, Router, Pinia, Element Plus)
```

## 分层职责

### 基础设施层（已完成）
- Router: 路由配置、权限守卫
- HTTP: Axios 封装、拦截器
- Utils: 工具函数（存储/时间/安全/验证/日志/监控）
- Config: 环境配置
- Mock: 开发数据
- Build: 构建优化

### 应用层（待实现）
- Views: 页面组件
- Components: 业务组件  
- Stores: 状态管理
- Types: 类型定义

## 依赖规则

- 应用层依赖基础设施层
- 基础设施层不依赖应用层
- 两层都可使用第三方库

## 数据流

```
用户操作 → 页面 → Store → API → HTTP → 后端
              ↓        ↓      ↓
           路由守卫  状态更新  拦截器
```

## 扩展方式

### 新增路由
```typescript
{
  path: '/new-page',
  component: () => import('@/views/NewPage.vue'),
  meta: { requireAuth: true, roles: ['admin'] }
}
```

### 新增 API
```typescript
export function getNewData() {
  return Http.get('/api/new-data')
}
```

### 新增工具
```typescript
export function newUtil() {
  // 实现
}
```

## 性能优化

- 路由懒加载
- 代码分包（vue/element-plus/utils）
- 资源压缩
- 长缓存策略

## 安全策略

- Token 自动携带
- 401 自动跳转
- XSS 防护（safeRender）
- 切屏检测
- 数据脱敏

## 常见问题

**Q: 如何添加新守卫规则？**
A: 在 `router/guards.ts` 的 beforeEach 中添加

**Q: 如何修改 API 地址？**
A: 修改 `.env.development` 中的 `VITE_API_BASE_URL`

**Q: 如何关闭 Mock？**
A: 设置 `VITE_USE_MOCK=false`
