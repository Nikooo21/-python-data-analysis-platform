// API服务文件，封装Worker API调用
import { startPerformanceMetric, endPerformanceMetric, handleError } from './monitoring';

// 本地开发环境，部署后需要修改为真实的Worker URL
const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIResponse {
  choices: {
    message: {
      role: 'assistant';
      content: string;
    };
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tasks: string[];
  gradientLevel: number;
}

interface AIPrompts {
  system: string;
  codeError: string;
  stuck: string;
  wrongAnswer: string;
}

interface ThinkingModel {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export async function callAIApi(messages: Message[]): Promise<string> {
  startPerformanceMetric('AI API Call');
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data: AIResponse = await response.json();
    endPerformanceMetric('AI API Call');
    return data.choices[0]?.message?.content || 'AI没有返回响应';
  } catch (error) {
    endPerformanceMetric('AI API Call');
    handleError(error as Error, 'AI API Call');
    // 降级处理，返回模拟响应
    return `我是你的AI教练，关于你的问题："${messages[messages.length - 1]?.content || ''}"\n\n这里是一些建议：\n1. 检查代码中的语法错误\n2. 确保导入了所有必要的库\n3. 验证数据格式是否正确\n4. 尝试使用print语句调试`;
  }
}

export async function getProjects(): Promise<Project[]> {
  startPerformanceMetric('Get Projects');
  try {
    const response = await fetch(`${WORKER_URL}/api/projects`);
    
    if (!response.ok) {
      throw new Error(`获取项目数据失败: ${response.status}`);
    }
    
    const projects = await response.json();
    endPerformanceMetric('Get Projects');
    return projects;
  } catch (error) {
    endPerformanceMetric('Get Projects');
    handleError(error as Error, 'Get Projects');
    // 降级处理，返回默认项目数据
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
        ],
        gradientLevel: 1
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
        ],
        gradientLevel: 2
      },
      {
        id: 'project-3',
        title: '探索性数据分析',
        description: '学习使用统计方法探索数据分布和特征',
        difficulty: 'intermediate',
        tasks: [
          '计算基本统计量（均值、中位数、标准差）',
          '分析数据分布和偏度',
          '识别数据中的模式和趋势'
        ],
        gradientLevel: 3
      }
    ];
  }
}

export async function getAIPrompts(): Promise<AIPrompts> {
  startPerformanceMetric('Get AI Prompts');
  try {
    const response = await fetch(`${WORKER_URL}/api/ai-prompts`);
    
    if (!response.ok) {
      throw new Error(`获取AI提示词失败: ${response.status}`);
    }
    
    const prompts = await response.json();
    endPerformanceMetric('Get AI Prompts');
    return prompts;
  } catch (error) {
    endPerformanceMetric('Get AI Prompts');
    handleError(error as Error, 'Get AI Prompts');
    // 降级处理，返回默认提示词
    return {
      system: `你是一个严格的Python数据分析教练，你的任务是帮助用户通过实操项目学习数据分析，而不是替他们写代码。\n1. 永远不要直接给用户完整的可运行代码，只给思路和关键代码片段；\n2. 当用户代码报错时，先指出错误原因，再告诉他们应该怎么改，不要直接贴修正后的代码；\n3. 当用户说"我卡住了"时，给他们一个下一步的提示，引导他们自己思考；\n4. 当用户答错题目时，一定要先追问："你哪里错了？漏掉了什么？"，然后再详细解释；\n5. 始终强调思维的重要性，而不是语法的正确性；\n6. 语言要简洁、直白、严厉，不要太客气。`,
      codeError: '请分析以下代码错误并给出修复建议，但不要直接提供完整代码：',
      stuck: '用户在项目中卡住了，请给出下一步的思路提示，引导他们自己思考：',
      wrongAnswer: '用户答错了题目，请先追问"你哪里错了？漏掉了什么？"，然后再详细解释正确答案：'
    };
  }
}

export async function getThinkingModels(): Promise<ThinkingModel[]> {
  startPerformanceMetric('Get Thinking Models');
  try {
    const response = await fetch(`${WORKER_URL}/api/thinking-models`);
    
    if (!response.ok) {
      throw new Error(`获取思维模型失败: ${response.status}`);
    }
    
    const models = await response.json();
    endPerformanceMetric('Get Thinking Models');
    return models;
  } catch (error) {
    endPerformanceMetric('Get Thinking Models');
    handleError(error as Error, 'Get Thinking Models');
    // 降级处理，返回默认思维模型
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
}
