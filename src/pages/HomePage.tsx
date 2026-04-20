import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: '3步认知体系',
      description: '从底层思维到行业争议，建立完整的数据分析认知框架',
      icon: '🎯',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: '10个梯度项目',
      description: '从基础到进阶，覆盖数据分析全流程的实战项目',
      icon: '📊',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'AI智能陪练',
      description: '智能AI导师，提供实时指导和代码优化建议',
      icon: '🤖',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: '无需后端',
      description: '基于Cloudflare边缘计算，零成本部署和使用',
      icon: '☁️',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: '学习基础概念',
      description: '了解数据分析的核心概念和思维模型，建立知识体系',
      icon: '📚'
    },
    {
      number: '02',
      title: '完成实战项目',
      description: '从基础到进阶，完成10个项目，掌握数据分析技能',
      icon: '💻'
    },
    {
      number: '03',
      title: 'AI辅助提升',
      description: '遇到问题时，AI导师提供专业指导和建议',
      icon: '🚀'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="hero-gradient text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Python数据分析平台
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              专业的Python数据分析学习平台，从基础到进阶，帮助你系统掌握数据分析技能
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/projects"
                className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-200 hover:-translate-y-1"
              >
                开始项目
              </Link>
              <Link
                to="/guide"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              平台特色
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们提供专业的学习体验和丰富的实战项目
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`card feature-card p-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${feature.color} w-14 h-14 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              学习路径
            </h2>
            <p className="text-lg text-gray-600">
              三步掌握数据分析技能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`card p-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div className="text-4xl font-bold text-blue-100 mb-4">{step.number}</div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10</div>
              <div className="text-blue-100">实战项目</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-blue-100">学习阶段</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">免费使用</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-blue-100">练习次数</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            准备好开始学习了吗？
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            零成本、零门槛，打开浏览器即可开始你的数据分析学习之旅
          </p>
          <Link
            to="/projects"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:-translate-y-1"
          >
            立即开始
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;