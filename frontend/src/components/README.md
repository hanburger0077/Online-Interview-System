# Components（公共组件）

存放可复用组件。

## 组件规划

```
components/
├── DeviceSelector.vue    设备选择器
├── MediaTile.vue         视频卡片
├── RoomVideoGrid.vue     视频网格
├── QuestionPanel.vue     题目面板
├── NetworkIndicator.vue  网络指示器
├── NoticeBell.vue        站内信铃铛
└── Countdown.vue         倒计时
```

## 规范

- 使用 PascalCase 命名
- 使用 Composition API
- 样式使用 scoped
- Props/Emits 需定义类型

## 模板

```vue
<template>
  <div class="component-name"></div>
</template>

<script setup lang="ts">
interface Props {
  // props
}

interface Emits {
  // events
}
</script>

<style scoped>
.component-name {}
</style>
```
