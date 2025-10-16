# Husky Git Hooks 配置

默认不启用。启用后每次提交前自动检查和格式化代码。

## 启用

```bash
npm install -D husky
npx husky install
cp -r .husky.example .husky
npx husky add .husky/pre-commit "npx lint-staged"
chmod +x .husky/pre-commit
```

在 package.json 添加：
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 跳过检查

```bash
git commit --no-verify -m "message"
```

## 注意

仅本地生效，团队成员需各自启用。
