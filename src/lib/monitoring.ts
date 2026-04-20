// 性能监控和错误处理工具

// 性能监控
interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

const performanceMetrics: Record<string, PerformanceMetric> = {};

// 开始性能监控
export function startPerformanceMetric(name: string) {
  performanceMetrics[name] = {
    name,
    startTime: performance.now()
  };
}

// 结束性能监控并获取结果
export function endPerformanceMetric(name: string): PerformanceMetric | null {
  const metric = performanceMetrics[name];
  if (!metric) return null;
  
  metric.endTime = performance.now();
  metric.duration = metric.endTime - metric.startTime;
  
  // 记录性能指标
  console.log(`[Performance] ${name}: ${metric.duration.toFixed(2)}ms`);
  
  // 可以在这里添加性能指标上报逻辑
  // 例如：发送到监控服务
  
  return metric;
}

// 错误处理
export function handleError(error: Error, context: string) {
  console.error(`[Error] ${context}:`, error);
  
  // 可以在这里添加错误上报逻辑
  // 例如：发送到错误监控服务
  
  // 显示用户友好的错误消息
  const errorMessage = getErrorMessage(error);
  showErrorNotification(errorMessage);
  
  return errorMessage;
}

// 获取用户友好的错误消息
function getErrorMessage(error: Error): string {
  // 根据错误类型返回不同的错误消息
  if (error.message.includes('Pyodide')) {
    return 'Python运行环境初始化失败，请刷新页面重试';
  }
  if (error.message.includes('AI') || error.message.includes('API')) {
    return 'AI服务暂时不可用，请稍后重试';
  }
  return '操作失败，请刷新页面重试';
}

// 显示错误通知
function showErrorNotification(message: string) {
  // 这里可以使用更复杂的通知库，如react-toastify
  alert(`错误: ${message}`);
}

// 全局错误捕获
export function setupGlobalErrorHandler() {
  // 捕获未处理的Promise拒绝
  window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason as Error, 'Unhandled Promise Rejection');
  });
  
  // 捕获全局错误
  window.addEventListener('error', (event) => {
    handleError(event.error, 'Global Error');
  });
}

// 网络请求错误处理
export function handleNetworkError(error: any): string {
  if (error.response) {
    // 服务器返回错误状态码
    return `服务器错误: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    // 请求已发送但没有收到响应
    return '网络错误: 无法连接到服务器';
  } else {
    // 请求配置错误
    return `请求错误: ${error.message}`;
  }
}