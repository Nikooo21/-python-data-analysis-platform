import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProgress } from '../lib/storage';
import { getProjects, Project } from '../lib/api';

const ProjectsPage: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const progress = getAllProgress();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('获取项目数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = difficulty === 'all' 
    ? projects 
    : projects.filter(project => project.difficulty === difficulty);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">10个梯度项目</h1>
        <p className="text-gray-600 text-center max-w-2xl">
          从简单到复杂的Python数据分析项目，帮助你循序渐进地掌握数据分析技能
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* 难度筛选 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setDifficulty('all')}
              className={`px-4 py-2 rounded-full ${difficulty === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              全部
            </button>
            <button
              onClick={() => setDifficulty('beginner')}
              className={`px-4 py-2 rounded-full ${difficulty === 'beginner' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              初级
            </button>
            <button
              onClick={() => setDifficulty('intermediate')}
              className={`px-4 py-2 rounded-full ${difficulty === 'intermediate' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              中级
            </button>
            <button
              onClick={() => setDifficulty('advanced')}
              className={`px-4 py-2 rounded-full ${difficulty === 'advanced' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              高级
            </button>
          </div>

          {/* 项目列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: Project) => {
              const projectProgress = progress[project.id];
              const isCompleted = projectProgress?.completed || false;
              
              return (
                <Link to={`/project/${project.id}`} key={project.id}>
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty === 'beginner' ? '初级' : project.difficulty === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">梯度: {project.gradientLevel}/10</span>
                      </div>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <span className="text-green-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            已完成
                          </span>
                        ) : (
                          <span className="text-gray-500">未完成</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsPage;