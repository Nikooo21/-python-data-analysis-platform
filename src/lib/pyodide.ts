// 动态导入Pyodide，实现懒加载
let loadPyodide: any = null;
let pyodide: any = null;
let loadingPromise: Promise<any> | null = null;
let isLoaded = false;
let loadingProgress: number = 0;
let progressCallback: ((progress: number, status: string) => void) | null = null;

// 缓存配置
const CACHE_KEY = 'pyodide-cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7天缓存

// 初始化Pyodide，预装所需库
export async function initPyodide(onProgress?: (progress: number, status: string) => void) {
  if (pyodide) return pyodide;
  if (loadingPromise) return loadingPromise;
  
  progressCallback = onProgress || null;
  loadingProgress = 0;
  
  loadingPromise = (async () => {
    try {
      // 动态导入Pyodide
      if (!loadPyodide) {
        updateProgress(10, '加载Pyodide模块');
        const pyodideModule = await import('pyodide');
        loadPyodide = pyodideModule.loadPyodide;
      }
      
      // 配置Pyodide加载选项
      updateProgress(20, '初始化Pyodide核心');
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        // 启用WebAssembly streaming编译
        stdin: () => '',
        // 启用缓存
        fullStdLib: false
      });
      
      // Pyodide核心加载完成
      updateProgress(30, 'Pyodide核心加载完成');
      
      // 分批次加载包，优化加载速度
      const packages = [
        ['numpy'], // 基础依赖
        ['pandas'], // 数据处理
        ['matplotlib'], // 图表
        ['seaborn', 'scikit-learn', 'mlxtend'] // 高级库
      ];
      
      for (let i = 0; i < packages.length; i++) {
        const batch = packages[i];
        updateProgress(30 + (i * 17), `加载包: ${batch.join(', ')}`);
        await pyodide.loadPackage(batch);
      }
      
      // 配置matplotlib，使其在前端渲染
      updateProgress(90, '配置matplotlib');
      pyodide.runPython(`
        import matplotlib.pyplot as plt
        plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei']
        plt.rcParams['axes.unicode_minus'] = False
        plt.ioff()
      `);
      
      // 保存缓存信息
      saveCacheInfo();
      
      updateProgress(100, '初始化完成');
      isLoaded = true;
      return pyodide;
    } catch (error) {
      console.error('Pyodide初始化失败:', error);
      updateProgress(0, `初始化失败: ${(error as Error).message}`);
      throw error;
    } finally {
      loadingPromise = null;
      progressCallback = null;
    }
  })();
  
  return loadingPromise;
}

// 保存缓存信息
function saveCacheInfo() {
  try {
    const cacheInfo = {
      timestamp: Date.now(),
      version: '0.26.2'
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheInfo));
  } catch (error) {
    console.warn('保存缓存信息失败:', error);
  }
}

// 检查缓存是否有效
function isCacheValid(): boolean {
  try {
    const cacheInfoStr = localStorage.getItem(CACHE_KEY);
    if (!cacheInfoStr) return false;
    
    const cacheInfo = JSON.parse(cacheInfoStr);
    const now = Date.now();
    return now - cacheInfo.timestamp < CACHE_EXPIRY;
  } catch (error) {
    return false;
  }
}

// 更新加载进度
function updateProgress(progress: number, status: string) {
  loadingProgress = progress;
  if (progressCallback) {
    progressCallback(progress, status);
  }
}

// 运行Python代码
export async function runPythonCode(code: string) {
  // 动态导入监控模块
  const { startPerformanceMetric, endPerformanceMetric, handleError } = await import('./monitoring');
  
  startPerformanceMetric('Python Code Execution');
  const py = await initPyodide();
  try {
    // 捕获标准输出
    let stdout = '';
    let stderr = '';
    
    const originalPrint = py.globals.get('print');
    py.globals.set('print', py.globals.get('print').bind(py.globals, {
      'file': {
        'write': (text: string) => {
          stdout += text;
          return true;
        }
      }
    }));
    
    const result = await py.runPythonAsync(code);
    
    // 恢复原始print函数
    py.globals.set('print', originalPrint);
    
    endPerformanceMetric('Python Code Execution');
    return { 
      success: true, 
      result, 
      stdout, 
      stderr 
    };
  } catch (error) {
    endPerformanceMetric('Python Code Execution');
    const errorMessage = handleError(error as Error, 'Python Code Execution');
    return { 
      success: false, 
      error: errorMessage, 
      stdout: '', 
      stderr: errorMessage 
    };
  }
}

// 检查Pyodide是否已加载
export function getPyodideStatus() {
  return {
    isLoaded,
    isLoading: !!loadingPromise,
    loadingProgress,
    isCacheValid: isCacheValid()
  };
}

// 预加载Pyodide（可选，可在空闲时调用）
export function preloadPyodide() {
  if (!pyodide && !loadingPromise && isCacheValid()) {
    initPyodide((progress, status) => {
      console.log(`Pyodide预加载: ${progress}% - ${status}`);
    }).catch(console.error);
  }
}

// 重新初始化Pyodide
export async function reloadPyodide(onProgress?: (progress: number, status: string) => void) {
  if (pyodide) {
    // 清理现有实例
    try {
      pyodide.destroy();
    } catch (error) {
      console.error('清理Pyodide实例失败:', error);
    }
    pyodide = null;
    isLoaded = false;
    // 清除缓存
    localStorage.removeItem(CACHE_KEY);
  }
  return initPyodide(onProgress);
}

// 生成数据集的辅助函数
export async function generateDataset(dataType: string, size: number = 1000) {
  try {
    let code = '';
    
    switch (dataType) {
      case 'regression':
        code = `
import pandas as pd
import numpy as np
np.random.seed(42)
x = np.linspace(0, 10, ${size})
y = 2 * x + 1 + np.random.normal(0, 2, ${size})
df = pd.DataFrame({'x': x, 'y': y})
print(df.to_json())
        `;
        break;
      case 'classification':
        code = `
import pandas as pd
import numpy as np
np.random.seed(42)
x1 = np.random.normal(0, 1, ${size})
x2 = np.random.normal(0, 1, ${size})
y = np.where(x1 + x2 > 0, 1, 0)
df = pd.DataFrame({'x1': x1, 'x2': x2, 'y': y})
print(df.to_json())
        `;
        break;
      case 'time_series':
        code = `
import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2020-01-01', periods=${size})
values = np.random.normal(100, 10, ${size}).cumsum()
df = pd.DataFrame({'date': dates, 'value': values})
df['date'] = df['date'].astype(str)
print(df.to_json())
        `;
        break;
      default:
        code = `
import pandas as pd
import numpy as np
np.random.seed(42)
data = np.random.rand(${size}, 5)
df = pd.DataFrame(data, columns=['col1', 'col2', 'col3', 'col4', 'col5'])
print(df.to_json())
        `;
    }
    
    const result = await runPythonCode(code);
    if (result.success && result.stdout) {
      return JSON.parse(result.stdout);
    }
    throw new Error('生成数据集失败');
  } catch (error) {
    console.error('生成数据集失败:', error);
    throw error;
  }
}

// 检查浏览器兼容性
export function checkBrowserCompatibility(): { supported: boolean; message?: string } {
  // 检查WebAssembly支持
  if (typeof WebAssembly === 'undefined') {
    return {
      supported: false,
      message: '您的浏览器不支持WebAssembly，请使用Chrome、Firefox、Edge等现代浏览器'
    };
  }
  
  // 检查Fetch API支持
  if (!window.fetch) {
    return {
      supported: false,
      message: '您的浏览器不支持Fetch API，请使用现代浏览器'
    };
  }
  
  // 检查Promise支持
  if (!window.Promise) {
    return {
      supported: false,
      message: '您的浏览器不支持Promise，请使用现代浏览器'
    };
  }
  
  return {
    supported: true
  };
}

// 按需加载特定包
export async function loadPackage(packageName: string | string[]) {
  const py = await initPyodide();
  await py.loadPackage(packageName);
  return true;
}
