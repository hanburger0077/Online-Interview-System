#!/bin/bash

# 前端部署脚本
# 用法: ./deploy.sh [环境]
# 示例: ./deploy.sh production

set -e

ENV=${1:-production}

echo "========================================"
echo "  开始部署前端应用"
echo "  环境: $ENV"
echo "========================================"

# 1. 检查依赖
echo ""
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
  echo "依赖未安装，开始安装..."
  npm install
fi

# 2. 代码检查
echo ""
echo "🔍 代码检查..."
npm run lint

# 3. 构建
echo ""
echo "🔨 开始构建..."
if [ "$ENV" = "production" ]; then
  npm run build -- --mode production
else
  npm run build -- --mode $ENV
fi

# 4. 检查构建产物
echo ""
echo "✅ 检查构建产物..."
if [ ! -d "dist" ]; then
  echo "❌ 构建失败：dist 目录不存在"
  exit 1
fi

echo ""
echo "📊 构建产物大小："
du -sh dist
echo ""
ls -lh dist/assets | head -10

# 5. 部署提示
echo ""
echo "========================================"
echo "  ✅ 构建完成！"
echo "========================================"
echo ""
echo "📁 构建产物位置: ./dist"
echo ""
echo "🚀 部署方式："
echo ""
echo "方式1: 静态服务器"
echo "  - 将 dist/ 目录上传到服务器"
echo "  - 使用 nginx.conf.example 配置 Nginx"
echo ""
echo "方式2: Docker"
echo "  docker build -t interview-frontend ."
echo "  docker run -p 80:80 interview-frontend"
echo ""
echo "方式3: 预览"
echo "  npm run preview"
echo ""
echo "========================================"

