import { callAIApi, getProjects, getAIPrompts, getThinkingModels } from './api';
import { vi } from 'vitest';

// 模拟fetch函数
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('API Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('callAIApi should return AI response', async () => {
    // 模拟AI API响应
    const mockResponse = {
      choices: [{
        message: {
          role: 'assistant',
          content: '这是AI的响应'
        }
      }]
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const messages = [{ role: 'user', content: '测试问题', timestamp: Date.now() }];
    const response = await callAIApi(messages);

    expect(response).toBe('这是AI的响应');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('getProjects should return projects data', async () => {
    // 模拟项目数据响应
    const mockProjects = [{
      id: 'project-1',
      title: '测试项目',
      description: '测试项目描述',
      difficulty: 'beginner',
      tasks: ['任务1', '任务2'],
      gradientLevel: 1
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockProjects
    });

    const projects = await getProjects();

    expect(projects).toEqual(mockProjects);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('getAIPrompts should return AI prompts', async () => {
    // 模拟AI提示词响应
    const mockPrompts = {
      system: '系统提示词',
      codeError: '代码错误提示',
      stuck: '卡住提示',
      wrongAnswer: '错误答案提示'
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPrompts
    });

    const prompts = await getAIPrompts();

    expect(prompts).toEqual(mockPrompts);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('getThinkingModels should return thinking models', async () => {
    // 模拟思维模型响应
    const mockModels = [{
      id: 'model-1',
      title: '测试思维模型',
      description: '测试思维模型描述',
      steps: ['步骤1', '步骤2']
    }];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockModels
    });

    const models = await getThinkingModels();

    expect(models).toEqual(mockModels);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('callAIApi should handle network error', async () => {
    // 模拟网络错误
    mockFetch.mockRejectedValue(new Error('Network error'));

    const messages = [{ role: 'user', content: '测试问题', timestamp: Date.now() }];
    const response = await callAIApi(messages);

    // 应该返回降级响应
    expect(response).toContain('我是你的AI教练');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('getProjects should handle network error', async () => {
    // 模拟网络错误
    mockFetch.mockRejectedValue(new Error('Network error'));

    const projects = await getProjects();

    // 应该返回默认项目数据
    expect(projects.length).toBeGreaterThan(0);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});