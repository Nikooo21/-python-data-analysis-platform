# Cloudflare Worker - AI API代理

本Worker实现了AI API代理功能，用于隐藏AI API Key，避免前端暴露导致泄露。同时，它还提供了静态内容托管功能，用于存储项目描述、任务清单、AI标准提示词、思维模型内容等静态数据。

## 功能特性

- **AI API代理**：隐藏AI API Key，通过Cloudflare AI Gateway转发请求
- **静态内容托管**：存储项目数据、AI提示词、思维模型等静态数据
- **错误处理**：完善的错误处理机制，确保服务稳定运行
- **降级方案**：当KV中没有数据时，返回默认数据

## 部署步骤

### 1. 安装Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 配置环境变量

编辑 `wrangler.json` 文件，替换以下环境变量：

```json
{
  "vars": {
    "CLOUDFLARE_ACCOUNT_ID": "你的Cloudflare账户ID",
    "AI_GATEWAY_NAME": "你的AI Gateway名称",
    "AI_API_KEY": "你的AI API Key"
  }
}
```

### 3. 配置KV命名空间

1. 登录Cloudflare控制台，进入Workers & Pages
2. 点击"KV"选项卡，创建一个新的KV命名空间，名称为`project-data`
3. 记录KV命名空间的ID，替换`wrangler.json`中的`id`和`preview_id`

### 4. 配置AI Gateway

1. 登录Cloudflare控制台，进入AI Gateway
2. 创建一个新的Gateway，名称为`ai-proxy-gateway`
3. 绑定你的AI API（豆包/OpenAI）
4. 记录Gateway的访问地址，确保与Worker代码中的URL格式一致

### 5. 部署Worker

```bash
cd worker
wrangler deploy
```

### 6. 配置前端

编辑前端代码中的`src/lib/api.ts`文件，将`WORKER_URL`替换为Worker的实际URL：

```typescript
const WORKER_URL = 'https://your-worker-name.your-account.workers.dev';
```

## 本地开发

### 1. 启动本地开发服务器

```bash
cd worker
wrangler dev
```

### 2. 测试API

- **AI API调用**：发送POST请求到 `http://localhost:8787`
- **获取项目数据**：发送GET请求到 `http://localhost:8787/api/projects`
- **获取AI提示词**：发送GET请求到 `http://localhost:8787/api/ai-prompts`
- **获取思维模型**：发送GET请求到 `http://localhost:8787/api/thinking-models`

## 环境变量说明

- **CLOUDFLARE_ACCOUNT_ID**：Cloudflare账户ID，可在Cloudflare控制台查看
- **AI_GATEWAY_NAME**：AI Gateway名称，在AI Gateway控制台创建
- **AI_API_KEY**：AI API Key，如OpenAI的API Key或豆包的API Key

## KV命名空间说明

- **PROJECT_DATA**：用于存储项目数据、AI提示词、思维模型等静态数据

## 代码结构

- **index.js**：Worker的主要代码，包含请求处理逻辑
- **wrangler.json**：Worker的配置文件，包含环境变量和KV绑定
- **package.json**：项目依赖配置

## 注意事项

- 确保AI Gateway的配置正确，特别是API Key的权限
- 确保KV命名空间的绑定正确，否则会返回默认数据
- 注意Cloudflare Workers的免费额度限制，避免超出每日请求限制
- 建议使用轻量模型（如gpt-4o-mini、豆包轻量版），降低调用成本

## 错误处理

- 当AI API调用失败时，Worker会返回500错误，前端会使用降级方案
- 当KV读取失败时，Worker会返回默认数据，确保服务正常运行
- 当请求方法不支持时，Worker会返回405错误
- 当请求路径不存在时，Worker会返回404错误
