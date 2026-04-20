import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';

// 懒加载Monaco Editor
const Editor = lazy(() => import('@monaco-editor/react'));
import { getProjectById } from '../lib/projects';
import { runPythonCode, checkBrowserCompatibility, preloadPyodide } from '../lib/pyodide';
import { 
  saveProjectProgress, 
  getProjectProgress, 
  saveChatMessages, 
  getChatMessages,
  saveCodeDraft,
  getCodeDraft
} from '../lib/storage';
import { callAIApi } from '../lib/api';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState(getChatMessages(id || ''));
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [browserCompatibility, setBrowserCompatibility] = useState<{ supported: boolean; message?: string }>({ supported: true });
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const codeRef = useRef<string>(code);
  const executionStartTime = useRef<number>(0);

  useEffect(() => {
    // 检查浏览器兼容性
    const compatibility = checkBrowserCompatibility();
    setBrowserCompatibility(compatibility);

    // 预加载Pyodide
    if (compatibility.supported) {
      setPyodideLoading(true);
      preloadPyodide();
    }
  }, []);

  useEffect(() => {
    if (project) {
      // 加载保存的代码或使用项目的起始代码
      const savedCode = getCodeDraft(id || '');
      setCode(savedCode || project.starterCode);
      codeRef.current = savedCode || project.starterCode;
      
      // 加载项目进度
      const progress = getProjectProgress(id || '');
      setIsCompleted(progress.completed);
    }
  }, [id, project]);

  const handleRunCode = async () => {
    if (!code) return;
    
    setIsRunning(true);
    setOutput('运行中...');
    executionStartTime.current = Date.now();
    
    try {
      const result = await runPythonCode(code);
      const executionTime = Date.now() - executionStartTime.current;
      
      if (result.success) {
        setOutput(`${result.result?.toString() || '代码执行成功'}\n\n执行时间: ${executionTime}ms`);
      } else {
        setOutput(`错误: ${result.error}\n\n执行时间: ${executionTime}ms`);
      }
    } catch (error) {
      const executionTime = Date.now() - executionStartTime.current;
      setOutput(`执行错误: ${(error as Error).message}\n\n执行时间: ${executionTime}ms`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveCode = () => {
    saveCodeDraft(id || '', code);
    saveProjectProgress(id || '', { code, completed: isCompleted });
    alert('代码已保存');
  };

  const handleMarkComplete = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    saveProjectProgress(id || '', { code, completed: newStatus });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMessage = {
      role: 'user' as const,
      content: userInput,
      timestamp: Date.now()
    };
    
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);
    
    try {
      // 调用真实的AI API
      const aiContent = await callAIApi(updatedMessages);
      
      const aiResponse = {
        role: 'assistant' as const,
        content: aiContent,
        timestamp: Date.now()
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setChatMessages(finalMessages);
      saveChatMessages(id || '', finalMessages);
    } catch (error) {
      console.error('AI请求失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskHint = async () => {
    const hintMessage = {
      role: 'user' as const,
      content: '我卡住了，需要思路点拨',
      timestamp: Date.now()
    };
    
    const updatedMessages = [...chatMessages, hintMessage];
    setChatMessages(updatedMessages);
    setIsLoading(true);
    
    try {
      const aiContent = await callAIApi(updatedMessages);
      
      const aiResponse = {
        role: 'assistant' as const,
        content: aiContent,
        timestamp: Date.now()
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setChatMessages(finalMessages);
      saveChatMessages(id || '', finalMessages);
    } catch (error) {
      console.error('AI请求失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeError = async () => {
    if (!code) return;
    
    const errorMessage = {
      role: 'user' as const,
      content: `我的代码报错了，请帮我分析：\n\n${code}`,
      timestamp: Date.now()
    };
    
    const updatedMessages = [...chatMessages, errorMessage];
    setChatMessages(updatedMessages);
    setIsLoading(true);
    
    try {
      const aiContent = await callAIApi(updatedMessages);
      
      const aiResponse = {
        role: 'assistant' as const,
        content: aiContent,
        timestamp: Date.now()
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setChatMessages(finalMessages);
      saveChatMessages(id || '', finalMessages);
    } catch (error) {
      console.error('AI请求失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">项目不存在</h1>
        <Link to="/projects" className="text-blue-500 hover:underline">返回项目列表</Link>
      </div>
    );
  }

  // 浏览器兼容性检查
  if (!browserCompatibility.supported) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          <h2 className="text-xl font-bold mb-2">浏览器兼容性问题</h2>
          <p>{browserCompatibility.message}</p>
        </div>
        <Link to="/projects" className="text-blue-500 hover:underline">返回项目列表</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 项目信息 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <Link to="/projects" className="text-blue-500 hover:underline mb-2 inline-block">
              ← 返回项目列表
            </Link>
            <h1 className="text-3xl font-bold">{project.title}</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleMarkComplete}
              className={`px-4 py-2 rounded ${isCompleted ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {isCompleted ? '标记为未完成' : '标记为完成'}
            </button>
          </div>
        </div>
        
        {/* Pyodide加载状态 */}
        {pyodideLoading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
              <div>
                <h3 className="font-semibold">Python环境加载中</h3>
                <p className="text-sm">正在准备Python运行环境...</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
              {project.difficulty === 'beginner' ? '初级' : project.difficulty === 'intermediate' ? '中级' : '高级'}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
              梯度: {project.gradientLevel}/10
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
              {project.category}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">学习目标</h3>
            <ul className="list-disc pl-5 space-y-1">
              {project.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">数据集说明</h3>
            <p className="text-gray-600">{project.datasetDescription}</p>
          </div>
        </div>
      </div>

      {/* 代码编辑和运行区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 代码编辑器 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="font-semibold">代码编辑器</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCode}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  保存代码
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className={`px-3 py-1 rounded text-sm ${isRunning ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
                >
                  {isRunning ? '运行中...' : '运行代码'}
                </button>
              </div>
            </div>
            <div className="h-96">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">加载编辑器...</p>
                  </div>
                </div>
              }>
                <Editor
                  height="100%"
                  defaultLanguage="python"
                  value={code}
                  onChange={(value) => {
                    setCode(value || '');
                    codeRef.current = value || '';
                  }}
                  options={{
                    minimap: { enabled: true },
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* 输出和提示区域 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="font-semibold mb-2">运行结果</h3>
            <div className="bg-gray-100 rounded p-3 h-48 overflow-auto">
              <pre className="text-sm">{output}</pre>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">提示</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {project.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI陪练区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">AI陪练</h3>
        
        {/* 快捷按钮 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleAskHint}
            disabled={isLoading}
            className={`px-3 py-1 rounded text-sm ${isLoading ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white'}`}
          >
            思路点拨
          </button>
          <button
            onClick={handleCodeError}
            disabled={isLoading || !code}
            className={`px-3 py-1 rounded text-sm ${isLoading || !code ? 'bg-gray-300 text-gray-600' : 'bg-yellow-500 text-white'}`}
          >
            代码纠错
          </button>
        </div>
        
        {/* 聊天记录 */}
        <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
          {chatMessages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-200">
                <p className="text-sm">AI正在思考...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* 输入区域 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="输入你的问题，例如：代码报错了怎么办？"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${isLoading ? 'opacity-50' : ''}`}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;