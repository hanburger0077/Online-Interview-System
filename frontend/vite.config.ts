import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const useMock = env.VITE_USE_MOCK === 'true'

  return {
    plugins: [
      vue(),
      // Mock 插件
      viteMockServe({
        mockPath: 'mock',
        enable: useMock,
      }),
    ],

    // 路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // 开发服务器配置
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      // 代理配置（可选）
      proxy: env.VITE_USE_PROXY === 'true'
        ? {
            '/api': {
              target: env.VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: path => path.replace(/^\/api/, ''),
            },
            '/ws': {
              target: env.VITE_WS_BASE_URL,
              ws: true,
              changeOrigin: true,
            },
          }
        : undefined,
    },

    // 构建优化配置
    build: {
      // 输出目录
      outDir: 'dist',
      // 资源目录
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码
      assetsInlineLimit: 4096,
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件
      sourcemap: mode === 'development',
      // chunk 大小警告的限制（kbs）
      chunkSizeWarningLimit: 2000,
      // Rollup 配置
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: {
            // Vue 全家桶
            vue: ['vue', 'vue-router', 'pinia'],
            // Element Plus
            'element-plus': ['element-plus', '@element-plus/icons-vue'],
            // 工具库
            utils: ['axios'],
          },
          // 输出文件名格式
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      // 压缩配置
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境移除 console
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },

    // 依赖优化
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios', 'element-plus'],
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  }
})
