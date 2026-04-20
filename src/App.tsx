import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/HomePage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        
        <main>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[80vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetailPage />} />
              <Route path="/thinking" element={<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">思维模型</h2>
                <p className="text-gray-600">思维模型页面正在开发中...</p>
              </div>} />
              <Route path="/controversy" element={<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">行业争议</h2>
                <p className="text-gray-600">行业争议页面正在开发中...</p>
              </div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </div>
  );
}

export default App;
