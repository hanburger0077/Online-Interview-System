#!/bin/bash

# 前端部署脚本
# 用法: ./deploy.sh [环境]

set -e

ENV=${1:-production}

echo "========================================"
echo "开始部署: $ENV"
echo "========================================"

# 检查依赖
if [ ! -d "node_modules" ]; then
  echo "安装依赖..."
  npm install
fi

# 代码检查
echo "代码检查..."
npm run lint

# 构建
echo "构建中..."
if [ "$ENV" = "production" ]; then
  npm run build -- --mode production
else
  npm run build -- --mode $ENV
fi

# 检查构建产物
if [ ! -d "dist" ]; then
  echo "构建失败: dist 目录不存在"
  exit 1
fi

echo ""
echo "构建完成!"
echo "产物位置: ./dist"
echo "产物大小: $(du -sh dist | cut -f1)"
echo ""
echo "部署方式:"
echo "  1. 上传 dist/ 到服务器，使用 nginx.conf.example"
echo "  2. Docker: docker build -t interview-frontend . && docker run -p 80:80 interview-frontend"
echo "  3. 预览: npm run preview"
echo ""
