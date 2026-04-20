// 学习进度类型定义
export interface ProjectProgress {
  code: string; // 用户编写的代码
  completed: boolean; // 是否完成
  lastUpdated: number; // 最后更新时间
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

// 清除所有进度
export const clearAllProgress = () => {
  localStorage.removeItem('learningProgress');
};

// 测试数据持久化
export const testStoragePersistence = () => {
  // 测试数据
  const testProjectId = 'test-project-1';
  const testProgress = {
    code: 'print("Hello, World!")',
    completed: true
  };
  
  // 保存测试数据
  saveProjectProgress(testProjectId, testProgress);
  
  // 读取测试数据
  const savedProgress = getProjectProgress(testProjectId);
  
  // 验证数据
  const isPersistenceWorking = 
    savedProgress.code === testProgress.code &&
    savedProgress.completed === testProgress.completed &&
    savedProgress.lastUpdated > 0;
  
  return {
    success: isPersistenceWorking,
    savedData: savedProgress,
    testData: testProgress
  };
};