# Components（公共组件）

此目录用于存放可复用的公共组件。

## 建议的组件结构

```
components/
├── DeviceSelector.vue      # 设备选择器（摄像头/麦克风/扬声器）
├── MediaTile.vue           # 视频卡片（用户画面）
├── RoomVideoGrid.vue       # 视频网格布局
├── QuestionPanel.vue       # 题目展示面板
├── NetworkIndicator.vue    # 网络状态指示器
├── NoticeBell.vue          # 站内信铃铛
├── Countdown.vue           # 倒计时组件
└── ...
```

## 组件规范

### 命名规范
- 使用 PascalCase（大驼峰）命名
- 名称要见名知意
- 避免过于通用的名称

### 组件模板
```vue
<template>
  <div class="component-name">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
// Props 定义
interface Props {
  // props
}

// Emits 定义
interface Emits {
  // events
}

// 组件逻辑
</script>

<style scoped>
.component-name {
  /* 样式 */
}
</style>
```

## 说明

- 组件要高内聚、低耦合
- 通过 props 传递数据，通过 emit 触发事件
- 尽量使用 Composition API
- 样式使用 scoped 避免污染

