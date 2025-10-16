# Stores（状态管理）

存放 Pinia Store，使用 Composition API。

## Store 规划

```
stores/
├── auth.ts       认证（用户、Token）
├── interview.ts  面试（场次、媒体流、切屏）
├── schedule.ts   预约（时段、预约列表）
├── notice.ts     站内信（消息、未读）
└── admin.ts      管理（房间、回放、成绩）
```

## 示例

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const user = ref(null)
  const isAuthenticated = computed(() => !!token.value)
  
  function login(data) {
    token.value = data.token
    user.value = data.user
  }
  
  return { token, user, isAuthenticated, login }
})
```
