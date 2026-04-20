# 🚀 部署指南

## 快速部署到Cloudflare Pages（免费）

### 1. 准备工作

- 注册一个GitHub账号：https://github.com
- 注册一个Cloudflare账号：https://dash.cloudflare.com

### 2. 部署步骤

#### 方式一：使用GitHub Actions自动部署（推荐）

1. **创建GitHub仓库**
   - 在GitHub上创建一个新仓库
   - 可以选择公开或私有仓库

2. **推送代码到GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

3. **配置Cloudflare Pages**
   - 登录Cloudflare Dashboard
   - 进入 Workers & Pages → Pages
   - 点击 "Create application"
   - 选择 "Connect to Git"
   - 授权Cloudflare访问你的GitHub账号
   - 选择刚才创建的仓库
   - 配置构建设置：
     - Project name: 填写项目名称（会作为你的子域名）
     - Production branch: main
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Environment variables:（可选，如果需要配置Worker URL）
   - 点击 "Save and Deploy"

4. **等待部署完成**
   - Cloudflare会自动开始构建和部署
   - 通常1-2分钟即可完成
   - 部署成功后会给你一个访问地址，格式类似：`https://你的项目名.pages.dev`

#### 方式二：手动部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **创建Cloudflare Pages项目**
   - 登录Cloudflare Dashboard
   - 进入 Workers & Pages → Pages
   - 点击 "Create application"
   - 选择 "Upload assets"
   - 填写项目名称
   - 将整个 `dist` 文件夹的内容拖上传区域
   - 点击 "Deploy"

### 3. 部署Worker（可选，用于AI功能）

如果需要使用AI陪练功能，还需要部署Cloudflare Worker：

1. **进入Workers & Pages → Workers**
2. **点击 "Create application"**
3. **选择 "Create Worker"**
4. **将 worker/index.js 的内容复制到编辑器中**
5. **配置环境变量**（在Settings -> Variables）：
   - `CLOUDFLARE_ACCOUNT_ID`: 你的Cloudflare账号ID
   - `AI_GATEWAY_NAME`: AI Gateway名称
   - `AI_API_KEY`: AI服务的API Key
6. **点击 "Deploy"**
7. **获取Worker的访问地址**，然后在前端项目中配置

### 4. 自定义域名（可选）

1. 在Cloudflare Pages的项目设置中
2. 进入 "Custom domains"
3. 添加你的域名
4. 按照提示配置DNS

## 部署验证

部署成功后，访问你的网站，检查以下功能：

1. 首页加载正常
2. 导航栏工作正常
3. 可以访问项目列表
4. Python代码可以运行（可能需要稍等，因为Pyodide需要加载）
5. 学习进度保存功能正常

## 常见问题

### Q: 部署后页面空白或404？

A: 检查以下几点：
- 确认构建输出目录设置为 `dist`
- 检查路由配置是否正确
- 查看浏览器控制台的错误信息

### Q: Pyodide加载慢？

A: 这是正常现象，因为Pyodide需要从CDN下载资源。可以考虑：
- 使用CDN加速
- 添加加载动画提升用户体验

### Q: AI功能无法使用？

A: 确保：
- Worker已正确部署
- 环境变量已配置
- AI服务的API Key有效

## 费用说明

使用Cloudflare Pages免费套餐：
- 无限站点
- 无限带宽
- 每天100次构建
- 完全免费！

Cloudflare Workers免费套餐：
- 每天10万次请求
- 每月10GB带宽
- 完全免费！

### 享受你的在线平台吧！🎉
