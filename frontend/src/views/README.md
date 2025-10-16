# Views（页面组件）

此目录用于存放页面组件。

## 目录结构

```
views/
├── Auth/              # 认证相关页面
│   └── Login.vue      # 登录页
├── Interview/         # 考生面试相关页面
│   ├── Schedule.vue   # 预约时段
│   ├── MyReservations.vue  # 我的预约
│   ├── Lobby.vue      # 候场页
│   ├── Live.vue       # 面试直播间
│   └── Result.vue     # 成绩查询
├── Reviewer/          # 面试官相关页面
│   ├── Agenda.vue     # 日程管理
│   └── Room.vue       # 面试房间
├── Admin/             # 管理员相关页面
│   ├── Rooms.vue      # 房间管理
│   ├── Recordings.vue # 回放管理
│   ├── Publish.vue    # 成绩发布
│   └── Notices.vue    # 站内信管理
├── Error/             # 错误页面
│   ├── 403.vue        # 无权限
│   └── 404.vue        # 页面不存在
├── Landing.vue        # 首页
└── Dashboard.vue      # 控制台
```

## 说明

- 路由配置已在 `@/router/index.ts` 中定义
- 路由守卫已配置，支持权限控制
- 页面组件需要根据实际需求实现

