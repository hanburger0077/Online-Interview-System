# Stores（状态管理）

此目录用于存放 Pinia Store。

## 建议的 Store 结构

```
stores/
├── auth.ts            # 认证状态（用户信息、Token）
├── interview.ts       # 面试状态（当前场次、媒体流、切屏记录）
├── schedule.ts        # 预约状态（时段列表、我的预约）
├── notice.ts          # 站内信状态（消息列表、未读数）
└── admin.ts           # 管理员状态（房间、回放、成绩）
```

## 示例

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const token = ref<string>('')
  const user = ref<User | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!token.value)

  // 方法
  function login(data: LoginResponse) {
    token.value = data.token
    user.value = data.user
  }

  function logout() {
    token.value = ''
    user.value = null
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
})
```

## 说明

- 使用 Composition API 风格
- 状态需要持久化的可以使用 localStorage
- 已集成 Pinia，可以直接使用

