// 初始化KV数据的脚本

// 10个梯度项目数据
const simplifiedProjects = [
  {
    id: 'project-1',
    title: '基础数据探索',
    description: '使用pandas进行简单的数据分析，了解数据基本结构',
    difficulty: 'beginner',
    tasks: [
      '了解数据的基本信息',
      '计算基本统计量',
      '绘制简单的柱状图'
    ],
    gradientLevel: 1
  },
  {
    id: 'project-2',
    title: '数据清洗与预处理',
    description: '处理缺失值、重复值和异常值，为后续分析做准备',
    difficulty: 'beginner',
    tasks: [
      '识别和处理缺失值',
      '处理重复记录',
      '检测和处理异常值'
    ],
    gradientLevel: 2
  },
  {
    id: 'project-3',
    title: '数据可视化进阶',
    description: '使用matplotlib和seaborn创建多种类型的图表',
    difficulty: 'beginner',
    tasks: [
      '创建散点图分析相关性',
      '创建箱线图分析分布',
      '创建热力图分析相关性矩阵'
    ],
    gradientLevel: 3
  },
  {
    id: 'project-4',
    title: '时间序列分析',
    description: '分析时间序列数据，识别趋势和季节性',
    difficulty: 'intermediate',
    tasks: [
      '分析时间序列的基本特征',
      '识别趋势和季节性',
      '预测未来值'
    ],
    gradientLevel: 4
  },
  {
    id: 'project-5',
    title: '分类数据分析',
    description: '分析分类数据，计算频率和百分比',
    difficulty: 'intermediate',
    tasks: [
      '分析分类变量的分布',
      '计算频率和百分比',
      '创建饼图和条形图'
    ],
    gradientLevel: 5
  },
  {
    id: 'project-6',
    title: '回归分析',
    description: '使用线性回归模型预测连续变量',
    difficulty: 'intermediate',
    tasks: [
      '构建线性回归模型',
      '评估模型性能',
      '分析特征重要性'
    ],
    gradientLevel: 6
  },
  {
    id: 'project-7',
    title: '分类模型',
    description: '使用分类算法预测离散变量',
    difficulty: 'intermediate',
    tasks: [
      '构建分类模型',
      '评估模型性能',
      '分析分类结果'
    ],
    gradientLevel: 7
  },
  {
    id: 'project-8',
    title: '聚类分析',
    description: '使用K-means算法进行无监督聚类',
    difficulty: 'advanced',
    tasks: [
      '使用K-means进行聚类',
      '确定最优聚类数',
      '分析聚类结果'
    ],
    gradientLevel: 8
  },
  {
    id: 'project-9',
    title: '特征工程',
    description: '创建和选择特征，提高模型性能',
    difficulty: 'advanced',
    tasks: [
      '创建新特征',
      '选择重要特征',
      '评估特征对模型的影响'
    ],
    gradientLevel: 9
  },
  {
    id: 'project-10',
    title: '综合数据分析项目',
    description: '完成一个完整的数据分析项目，包括数据获取、清洗、分析和可视化',
    difficulty: 'advanced',
    tasks: [
      '完成端到端的数据分析流程',
      '生成综合性分析报告',
      '创建交互式可视化'
    ],
    gradientLevel: 10
  }
];

const aiPrompts = {
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

const thinkingModels = [
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

// 导出数据以便在其他脚本中使用
export { simplifiedProjects, aiPrompts, thinkingModels };

// 如果直接运行此脚本，将数据发送到Worker
if (import.meta.url === `file://${process.argv[1]}`) {
  import('node-fetch').then(({ default: fetch }) => {
    const workerUrl = 'http://localhost:8787';
    
    // 上传项目数据
    fetch(`${workerUrl}/api/projects`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simplifiedProjects)
    })
    .then(response => response.json())
    .then(data => console.log('项目数据上传成功:', data))
    .catch(error => console.error('项目数据上传失败:', error));
    
    // 上传AI提示词
    fetch(`${workerUrl}/api/ai-prompts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aiPrompts)
    })
    .then(response => response.json())
    .then(data => console.log('AI提示词上传成功:', data))
    .catch(error => console.error('AI提示词上传失败:', error));
    
    // 上传思维模型
    fetch(`${workerUrl}/api/thinking-models`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(thinkingModels)
    })
    .then(response => response.json())
    .then(data => console.log('思维模型上传成功:', data))
    .catch(error => console.error('思维模型上传失败:', error));
  });
}
