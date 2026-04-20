import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupGlobalErrorHandler, startPerformanceMetric, endPerformanceMetric } from './lib/monitoring'

// 启动性能监控
startPerformanceMetric('App Initialization')

// 设置全局错误处理
setupGlobalErrorHandler()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// 结束性能监控
endPerformanceMetric('App Initialization')