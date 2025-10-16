# Types（类型定义）

此目录用于存放 TypeScript 类型定义。

## 建议的类型结构

```
types/
├── user.ts            # 用户相关类型
├── interview.ts       # 面试相关类型
├── api.ts             # API 响应类型
├── common.ts          # 通用类型
└── index.ts           # 统一导出
```

## 示例

### user.ts
```typescript
export enum UserRole {
  CANDIDATE = 'candidate',
  INTERVIEWER = 'interviewer',
  ADMIN = 'admin',
}

export interface User {
  id: string
  name: string
  role: UserRole
  avatar?: string
  email?: string
}
```

### api.ts
```typescript
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PageData<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
```

### index.ts
```typescript
export * from './user'
export * from './interview'
export * from './api'
export * from './common'
```

## 说明

- 所有接口返回的数据都应该定义类型
- 类型定义要完整，避免使用 `any`
- 通过 `index.ts` 统一导出，方便使用

