// 学习进度类型定义
export interface ProjectProgress {
  code: string; // 用户编写的代码
  completed: boolean; // 是否完成
  lastUpdated: number; // 最后更新时间
}

// AI聊天记录类型定义
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// 存储单个项目进度
export const saveProjectProgress = (projectId: string, progress: Omit<ProjectProgress, 'lastUpdated'>) => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  allProgress[projectId] = {
    ...progress,
    lastUpdated: Date.now()
  };
  localStorage.setItem('learningProgress', JSON.stringify(allProgress));
};

// 获取单个项目进度
export const getProjectProgress = (projectId: string): ProjectProgress => {
  const allProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
  return allProgress[projectId] || { code: '', completed: false, lastUpdated: 0 };
};

// 获取所有项目进度
export const getAllProgress = (): Record<string, ProjectProgress> => {
  return JSON.parse(localStorage.getItem('learningProgress') || '{}');
};

// 存储AI聊天记录
export const saveChatMessages = (projectId: string, messages: ChatMessage[]) => {
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  allChats[projectId] = messages;
  localStorage.setItem('chatMessages', JSON.stringify(allChats));
};

// 获取AI聊天记录
export const getChatMessages = (projectId: string): ChatMessage[] => {
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  return allChats[projectId] || [];
};

// 清空单个项目的聊天记录
export const clearChatMessages = (projectId: string) => {
  const allChats = JSON.parse(localStorage.getItem('chatMessages') || '{}');
  delete allChats[projectId];
  localStorage.setItem('chatMessages', JSON.stringify(allChats));
};

// 存储代码草稿
export const saveCodeDraft = (projectId: string, code: string) => {
  const allDrafts = JSON.parse(localStorage.getItem('codeDrafts') || '{}');
  allDrafts[projectId] = {
    code,
    lastUpdated: Date.now()
  };
  localStorage.setItem('codeDrafts', JSON.stringify(allDrafts));
};

// 获取代码草稿
export const getCodeDraft = (projectId: string): string => {
  const allDrafts = JSON.parse(localStorage.getItem('codeDrafts') || '{}');
  return allDrafts[projectId]?.code || '';
};