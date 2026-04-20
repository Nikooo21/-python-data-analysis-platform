export default {
  async fetch(request, env) {
    // 处理GET请求，用于读取KV数据
    if (request.method === 'GET') {
      return handleGetRequest(request, env);
    }
    
    // 处理POST请求，用于AI API调用
    if (request.method === 'POST') {
      return handlePostRequest(request, env);
    }
    
    // 处理PUT请求，用于写入KV数据
    if (request.method === 'PUT') {
      return handlePutRequest(request, env);
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
};

// 处理GET请求，读取KV数据
async function handleGetRequest(request, env) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // 解析请求路径，确定要读取的数据类型
    if (path.startsWith('/api/projects')) {
      return await getProjectsData(env);
    } else if (path.startsWith('/api/ai-prompts')) {
      return await getAIPrompts(env);
    } else if (path.startsWith('/api/thinking-models')) {
      return await getThinkingModels(env);
    }
    
    return new Response('Not Found', { status: 404 });
  } catch (error) {
    return new Response(JSON.stringify({ error: '读取数据失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理PUT请求，写入KV数据
async function handlePutRequest(request, env) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    const body = await request.json();
    
    // 解析请求路径，确定要写入的数据类型
    if (path.startsWith('/api/projects')) {
      await env.PROJECT_DATA.put('projects', JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: '项目数据已更新' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (path.startsWith('/api/ai-prompts')) {
      await env.PROJECT_DATA.put('ai_prompts', JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: 'AI提示词已更新' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else if (path.startsWith('/api/thinking-models')) {
      await env.PROJECT_DATA.put('thinking_models', JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: '思维模型已更新' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('写入数据失败:', error);
    return new Response(JSON.stringify({ error: '写入数据失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理POST请求，调用AI API
async function handlePostRequest(request, env) {
  try {
    // 接收前端请求数据（用户消息）
    const { messages } = await request.json();
    
    // 拼接系统提示词（AI规范）
    const systemPrompt = {
      role: 'system',
      content: `你是一个严格的Python数据分析教练，你的任务是帮助用户通过实操项目学习数据分析，而不是替他们写代码。
1. 永远不要直接给用户完整的可运行代码，只给思路和关键代码片段；
2. 当用户代码报错时，先指出错误原因，再告诉他们应该怎么改，不要直接贴修正后的代码；
3. 当用户说"我卡住了"时，给他们一个下一步的提示，引导他们自己思考；
4. 当用户答错题目时，一定要先追问："你哪里错了？漏掉了什么？"，然后再详细解释；
5. 始终强调思维的重要性，而不是语法的正确性；
6. 语言要简洁、直白、严厉，不要太客气。`
    };

    // 转发请求到AI Gateway
    const aiResponse = await fetch(
      `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}/${env.AI_GATEWAY_NAME}/openai/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // 轻量模型，适配免费额度
          messages: [systemPrompt, ...messages],
          temperature: 0.7,
          max_tokens: 500
        })
      }
    );

    // 返回AI响应
    return new Response(aiResponse.body, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'AI请求失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 获取项目数据
async function getProjectsData(env) {
  try {
    // 尝试从KV读取项目数据
    const projectsData = await env.PROJECT_DATA.get('projects', { type: 'json' });
    
    if (projectsData) {
      return new Response(JSON.stringify(projectsData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 如果KV中没有数据，返回默认项目数据
    const defaultProjects = getDefaultProjects();
    return new Response(JSON.stringify(defaultProjects), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('获取项目数据失败:', error);
    return new Response(JSON.stringify({ error: '获取项目数据失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 获取AI提示词
async function getAIPrompts(env) {
  try {
    // 尝试从KV读取AI提示词
    const promptsData = await env.PROJECT_DATA.get('ai_prompts', { type: 'json' });
    
    if (promptsData) {
      return new Response(JSON.stringify(promptsData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 如果KV中没有数据，返回默认提示词
    const defaultPrompts = getDefaultAIPrompts();
    return new Response(JSON.stringify(defaultPrompts), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('获取AI提示词失败:', error);
    return new Response(JSON.stringify({ error: '获取AI提示词失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 获取思维模型数据
async function getThinkingModels(env) {
  try {
    // 尝试从KV读取思维模型数据
    const modelsData = await env.PROJECT_DATA.get('thinking_models', { type: 'json' });
    
    if (modelsData) {
      return new Response(JSON.stringify(modelsData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 如果KV中没有数据，返回默认思维模型
    const defaultModels = getDefaultThinkingModels();
    return new Response(JSON.stringify(defaultModels), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('获取思维模型失败:', error);
    return new Response(JSON.stringify({ error: '获取思维模型失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 默认项目数据
function getDefaultProjects() {
  return [
    {
      id: 'project-1',
      title: '数据可视化基础',
      description: '学习使用Matplotlib和Seaborn创建基本图表',
      difficulty: 'beginner',
      tasks: [
        '创建折线图展示时间序列数据',
        '使用柱状图比较不同类别的数据',
        '绘制散点图分析两个变量的关系'
      ]
    },
    {
      id: 'project-2',
      title: '数据清洗与预处理',
      description: '学习处理缺失值、异常值和重复数据',
      difficulty: 'intermediate',
      tasks: [
        '识别并处理缺失值',
        '检测和处理异常值',
        '移除重复数据并标准化数据格式'
      ]
    },
    {
      id: 'project-3',
      title: ' exploratory数据分析',
      description: '学习使用统计方法探索数据分布和特征',
      difficulty: 'intermediate',
      tasks: [
        '计算基本统计量（均值、中位数、标准差）',
        '分析数据分布和偏度',
        '识别数据中的模式和趋势'
      ]
    }
  ];
}

// 默认AI提示词
function getDefaultAIPrompts() {
  return {
    system: `你是一个严格的Python数据分析教练，你的任务是帮助用户通过实操项目学习数据分析，而不是替他们写代码。
1. 永远不要直接给用户完整的可运行代码，只给思路和关键代码片段；
2. 当用户代码报错时，先指出错误原因，再告诉他们应该怎么改，不要直接贴修正后的代码；
3. 当用户说"我卡住了"时，给他们一个下一步的提示，引导他们自己思考；
4. 当用户答错题目时，一定要先追问："你哪里错了？漏掉了什么？"，然后再详细解释；
5. 始终强调思维的重要性，而不是语法的正确性；
6. 语言要简洁、直白、严厉，不要太客气。`,
    codeError: '请分析以下代码错误并给出修复建议，但不要直接提供完整代码：',
    stuck: '用户在项目中卡住了，请给出下一步的思路提示，引导他们自己思考：',
    wrongAnswer: '用户答错了题目，请先追问"你哪里错了？漏掉了什么？"，然后再详细解释正确答案：'
  };
}

// 默认思维模型
function getDefaultThinkingModels() {
  return [
    {
      id: 'model-1',
      title: '数据思维模型',
      description: '从数据收集、清洗、分析到可视化的完整思维流程',
      steps: [
        '明确问题和目标',
        '收集和理解数据',
        '数据清洗和预处理',
        '探索性数据分析',
        '构建模型和验证',
        '结果解释和可视化',
        '总结和建议'
      ]
    },
    {
      id: 'model-2',
      title: '统计思维模型',
      description: '基于统计方法的数据分析思维框架',
      steps: [
        '描述性统计分析',
        '推断性统计分析',
        '假设检验',
        '相关性分析',
        '回归分析',
        '实验设计和A/B测试'
      ]
    }
  ];
}