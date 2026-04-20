import React, { useState, useEffect } from 'react';

const GuidePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('thinking');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 思维模型内容
  const thinkingModels = [
    {
      title: '数据思维',
      description: '以数据为中心的思考方式，通过数据分析发现问题、解决问题',
      keyPoints: [
        '数据是决策的基础',
        '数据需要清洗和处理',
        '数据可视化是沟通的桥梁',
        '数据驱动的决策过程'
      ],
      color: 'from-blue-500 to-indigo-600',
      icon: '📊'
    },
    {
      title: '业务思维',
      description: '理解业务需求，将数据分析与业务目标相结合',
      keyPoints: [
        '业务目标是数据分析的导向',
        '理解业务流程和痛点',
        '数据分析结果要能落地',
        '持续优化业务流程'
      ],
      color: 'from-green-500 to-teal-600',
      icon: '💼'
    },
    {
      title: '算法思维',
      description: '运用算法和模型解决复杂问题的思维方式',
      keyPoints: [
        '选择合适的算法模型',
        '理解算法的原理和局限性',
        '模型的训练和评估',
        '算法的优化和调参'
      ],
      color: 'from-purple-500 to-pink-600',
      icon: '🧮'
    }
  ];

  // 行业争议内容
  const controversies = [
    {
      title: '数据隐私 vs 数据分析',
      description: '如何在保护用户隐私的同时进行有效的数据分析',
      pros: [
        '数据分析可以改善产品和服务',
        '数据驱动的决策更准确',
        '大数据可以发现新的商业模式'
      ],
      cons: [
        '用户隐私可能被侵犯',
        '数据泄露的风险',
        '过度收集数据可能引起用户反感'
      ],
      icon: '🔒'
    },
    {
      title: '自动化 vs 人工分析',
      description: '自动化分析工具与人工分析的平衡',
      pros: [
        '自动化分析效率高',
        '可以处理大规模数据',
        '减少人为错误'
      ],
      cons: [
        '缺乏人类的直觉和洞察力',
        '无法处理复杂的业务场景',
        '可能产生错误的结论'
      ],
      icon: '🤖'
    }
  ];

  // 辨析题内容
  const questions = [
    {
      id: 1,
      question: '数据分析的核心是算法和模型，不需要了解业务背景',
      options: ['正确', '错误'],
      correctAnswer: '错误',
      explanation: '数据分析的核心是解决业务问题，算法和模型只是工具。不了解业务背景，分析结果可能偏离实际需求。'
    },
    {
      id: 2,
      question: '数据清洗是数据分析中最不重要的步骤',
      options: ['正确', '错误'],
      correctAnswer: '错误',
      explanation: '数据清洗是数据分析的基础，垃圾数据会导致错误的分析结果。'
    },
    {
      id: 3,
      question: '数据可视化的主要目的是美观',
      options: ['正确', '错误'],
      correctAnswer: '错误',
      explanation: '数据可视化的主要目的是清晰地传达数据信息，帮助决策，美观是次要的。'
    }
  ];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className={`text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          学习引导
        </h1>

        {/* Tabs */}
        <div className={`border-b border-gray-200 mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('thinking')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${activeTab === 'thinking'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              思维模型
            </button>
            <button
              onClick={() => setActiveTab('controversy')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${activeTab === 'controversy'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              行业争议
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${activeTab === 'quiz'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              辨析题
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="space-y-8">
          {/* 思维模型 */}
          {activeTab === 'thinking' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {thinkingModels.map((model, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${500 + index * 200}ms` }}
                >
                  <div className={`bg-gradient-to-br ${model.color} w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-6`}>
                    {model.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-900">{model.title}</h2>
                  <p className="text-gray-600 mb-6">{model.description}</p>
                  <ul className="space-y-3">
                    {model.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* 行业争议 */}
          {activeTab === 'controversy' && (
            <div className="space-y-8">
              {controversies.map((controversy, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${700 + index * 300}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4">
                      {controversy.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{controversy.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{controversy.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <h3 className="text-lg font-medium mb-4 text-green-700 flex items-center">
                        <span className="mr-2">✓</span> 支持观点
                      </h3>
                      <ul className="space-y-3">
                        {controversy.pros.map((pro, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-600 mr-3 mt-1">+</span>
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                      <h3 className="text-lg font-medium mb-4 text-red-700 flex items-center">
                        <span className="mr-2">✗</span> 反对观点
                      </h3>
                      <ul className="space-y-3">
                        {controversy.cons.map((con, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-600 mr-3 mt-1">-</span>
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 辨析题 */}
          {activeTab === 'quiz' && (
            <div className={`bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-xl font-semibold mb-8 text-gray-900">辨析题</h2>
              <div className="space-y-8">
                {questions.map((question) => (
                  <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <p className="mb-6 text-gray-700">{question.id}. {question.question}</p>
                    <div className="flex flex-wrap gap-6 mb-4">
                      {question.options.map((option) => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={answers[question.id] === option}
                            onChange={() => handleAnswerChange(question.id, option)}
                            disabled={showResults}
                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className={`ml-3 ${showResults && answers[question.id] === option ? (answers[question.id] === question.correctAnswer ? 'text-green-600 font-medium' : 'text-red-600 font-medium') : 'text-gray-700'}`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    {showResults && (
                      <div className="mt-4 p-4 rounded-lg">
                        {answers[question.id] === question.correctAnswer ? (
                          <div className="bg-green-50 border border-green-200 text-green-800">
                            <div className="font-medium mb-2">回答正确！</div>
                            <div className="text-sm">{question.explanation}</div>
                          </div>
                        ) : (
                          <div className="bg-red-50 border border-red-200 text-red-800">
                            <div className="font-medium mb-2">回答错误</div>
                            <div className="text-sm">{question.explanation}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={showResults}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex-1 sm:flex-none"
                >
                  提交答案
                </button>
                {showResults && (
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setAnswers({});
                    }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg transition duration-300 flex-1 sm:flex-none"
                  >
                    重新答题
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;