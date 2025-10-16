import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import { logger, LogLevel } from './utils/logger'
import { LOG_CONFIG } from './config'
import { vSafeHtml } from './utils/safe-render'

logger.configure({
  level: LogLevel[LOG_CONFIG.level as keyof typeof LogLevel],
  enableConsole: LOG_CONFIG.enableConsole,
  enableRemote: LOG_CONFIG.enableRemote,
  remoteUrl: LOG_CONFIG.remoteUrl,
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('safe-html', vSafeHtml)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

logger.info('应用启动成功')
