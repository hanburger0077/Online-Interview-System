# Types（类型定义）

存放 TypeScript 类型定义。

## 类型规划

```
types/
├── user.ts       用户类型
├── interview.ts  面试类型
├── api.ts        API 响应类型
├── common.ts     通用类型
└── index.ts      统一导出
```

## 示例

```typescript
// user.ts
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
}

// api.ts
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// index.ts
export * from './user'
export * from './interview'
export * from './api'
```
