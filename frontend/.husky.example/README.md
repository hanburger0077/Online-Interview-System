# Husky Git Hooks 配置

## 说明

此目录包含 Git Hooks 配置示例。默认**不启用**，如需启用请按以下步骤操作。

## 启用步骤

### 1. 安装 Husky
```bash
npm install -D husky
npx husky install
```

### 2. 复制配置文件
```bash
cp -r .husky.example .husky
```

### 3. 添加 Git Hook
```bash
npx husky add .husky/pre-commit "npx lint-staged"
chmod +x .husky/pre-commit
```

### 4. 配置 package.json
在 `package.json` 中添加：
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 功能

启用后，每次 `git commit` 前会自动：
- ✅ 运行 ESLint 检查并自动修复
- ✅ 运行 Prettier 格式化代码
- ✅ 只检查暂存区的文件（不影响未提交的代码）

## 禁用

如果需要临时跳过检查：
```bash
git commit --no-verify -m "message"
```

## 注意

- Hooks 只在**本地**生效
- 不会影响已有的提交历史
- 团队成员需要各自启用

