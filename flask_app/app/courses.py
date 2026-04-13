# 课程数据
courses = [
    {
        "id": 1,
        "title": "数据分析基础入门",
        "level": "基础",
        "description": "了解数据分析的基本概念和方法，掌握数据处理的核心技能。",
        "modules": [
            {
                "id": 1,
                "title": "数据分析概述",
                "content": "数据分析是指通过收集、处理和分析数据，提取有价值的信息和见解的过程。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "数据分析简介",
                        "url": "https://example.com/video1",
                        "duration": "15:30"
                    }
                ],
                "exercises": [
                    {
                        "id": 1,
                        "type": "programming",
                        "title": "数据类型识别",
                        "description": "识别并分类不同类型的数据",
                        "template": "# 请编写代码识别数据类型\n# 示例数据\ndata = [1, 2.5, 'hello', True, [1, 2, 3]]\n\nfor item in data:\n    print(f'{item} 的类型是: {type(item)}')",
                        "solution": "# 解决方案\ndata = [1, 2.5, 'hello', True, [1, 2, 3]]\n\nfor item in data:\n    print(f'{item} 的类型是: {type(item)}')"
                    }
                ],
                "assessments": [
                    {
                        "id": 1,
                        "type": "multiple_choice",
                        "question": "以下哪项不是数据分析的步骤？",
                        "options": [
                            "数据收集",
                            "数据清洗",
                            "数据存储",
                            "数据销毁"
                        ],
                        "correct_answer": 3
                    }
                ]
            },
            {
                "id": 2,
                "title": "数据收集与整理",
                "content": "学习如何收集和整理数据，为后续分析做准备。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "数据收集方法",
                        "url": "https://example.com/video2",
                        "duration": "20:15"
                    }
                ],
                "exercises": [
                    {
                        "id": 2,
                        "type": "programming",
                        "title": "数据整理练习",
                        "description": "整理并格式化给定的数据",
                        "template": "# 请编写代码整理数据\n# 原始数据\nraw_data = ['  123  ', '456', '  789  ']\n\n# 整理后的数据\ncleaned_data = []\nfor item in raw_data:\n    # 请添加代码\n    pass\n\nprint(cleaned_data)",
                        "solution": "# 解决方案\nraw_data = ['  123  ', '456', '  789  ']\n\n# 整理后的数据\ncleaned_data = []\nfor item in raw_data:\n    cleaned_data.append(item.strip())\n\nprint(cleaned_data)"
                    }
                ],
                "assessments": [
                    {
                        "id": 2,
                        "type": "multiple_choice",
                        "question": "以下哪种数据收集方法属于一手数据？",
                        "options": [
                            "问卷调查",
                            "政府统计数据",
                            "学术研究报告",
                            "企业公开数据"
                        ],
                        "correct_answer": 0
                    }
                ]
            },
            {
                "id": 3,
                "title": "基础统计分析",
                "content": "学习基本的统计分析方法，如均值、中位数、标准差等。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "基础统计概念",
                        "url": "https://example.com/video3",
                        "duration": "25:40"
                    }
                ],
                "exercises": [
                    {
                        "id": 3,
                        "type": "programming",
                        "title": "统计计算练习",
                        "description": "计算给定数据的基本统计量",
                        "template": "# 请编写代码计算统计量\n# 示例数据\ndata = [10, 15, 20, 25, 30]\n\n# 计算均值\nmean = sum(data) / len(data)\nprint(f'均值: {mean}')\n\n# 计算中位数\n# 请添加代码\n\n# 计算标准差\n# 请添加代码",
                        "solution": "# 解决方案\ndata = [10, 15, 20, 25, 30]\n\n# 计算均值\nmean = sum(data) / len(data)\nprint(f'均值: {mean}')\n\n# 计算中位数\ndata_sorted = sorted(data)\nif len(data_sorted) % 2 == 0:\n    median = (data_sorted[len(data_sorted)//2 - 1] + data_sorted[len(data_sorted)//2]) / 2\nelse:\n    median = data_sorted[len(data_sorted)//2]\nprint(f'中位数: {median}')\n\n# 计算标准差\nvariance = sum((x - mean) ** 2 for x in data) / len(data)\nstd_deviation = variance ** 0.5\nprint(f'标准差: {std_deviation}')"
                    }
                ],
                "assessments": [
                    {
                        "id": 3,
                        "type": "multiple_choice",
                        "question": "以下哪个统计量不受异常值影响？",
                        "options": [
                            "均值",
                            "标准差",
                            "中位数",
                            "极差"
                        ],
                        "correct_answer": 2
                    }
                ]
            },
            {
                "id": 4,
                "title": "数据可视化入门",
                "content": "学习如何使用图表可视化数据，增强数据理解。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "数据可视化基础",
                        "url": "https://example.com/video4",
                        "duration": "18:25"
                    }
                ],
                "exercises": [
                    {
                        "id": 4,
                        "type": "programming",
                        "title": "简单数据可视化",
                        "description": "创建一个简单的柱状图",
                        "template": "# 请编写代码创建柱状图\nimport matplotlib.pyplot as plt\n\n# 数据\ncategories = ['A', 'B', 'C', 'D']\nvalues = [10, 20, 15, 25]\n\n# 创建柱状图\nplt.bar(categories, values)\nplt.title('示例柱状图')\nplt.xlabel('类别')\nplt.ylabel('值')\nplt.show()",
                        "solution": "# 解决方案\nimport matplotlib.pyplot as plt\n\n# 数据\ncategories = ['A', 'B', 'C', 'D']\nvalues = [10, 20, 15, 25]\n\n# 创建柱状图\nplt.bar(categories, values)\nplt.title('示例柱状图')\nplt.xlabel('类别')\nplt.ylabel('值')\nplt.show()"
                    }
                ],
                "assessments": [
                    {
                        "id": 4,
                        "type": "multiple_choice",
                        "question": "以下哪种图表适合展示时间序列数据？",
                        "options": [
                            "柱状图",
                            "折线图",
                            "饼图",
                            "散点图"
                        ],
                        "correct_answer": 1
                    }
                ]
            }
        ],
        "duration": "4周",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20data%20analysis%20for%20beginners%2C%20cartoon%20style%2C%20friendly%20interface&image_size=square"
    },
    {
        "id": 2,
        "title": "Python数据分析基础",
        "level": "基础",
        "description": "学习使用Python进行数据分析，掌握NumPy和Pandas库的基本操作。",
        "modules": [
            {
                "id": 1,
                "title": "Python基础回顾",
                "content": "回顾Python的基本语法和数据结构，为数据分析做准备。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "Python基础语法",
                        "url": "https://example.com/video5",
                        "duration": "22:10"
                    }
                ],
                "exercises": [
                    {
                        "id": 1,
                        "type": "programming",
                        "title": "Python基础练习",
                        "description": "练习Python的基本语法和数据结构",
                        "template": "# 请编写代码完成以下任务\n# 1. 创建一个列表，包含1到10的数字\n# 2. 计算列表中所有元素的和\n# 3. 打印结果\n\n# 代码开始\nnumbers = list(range(1, 11))\nsum_numbers = sum(numbers)\nprint(f'列表元素的和: {sum_numbers}')",
                        "solution": "# 解决方案\nnumbers = list(range(1, 11))\nsum_numbers = sum(numbers)\nprint(f'列表元素的和: {sum_numbers}')"
                    }
                ],
                "assessments": [
                    {
                        "id": 1,
                        "type": "multiple_choice",
                        "question": "以下哪种数据结构是Python中不可变的？",
                        "options": [
                            "列表",
                            "字典",
                            "元组",
                            "集合"
                        ],
                        "correct_answer": 2
                    }
                ]
            },
            {
                "id": 2,
                "title": "NumPy数组操作",
                "content": "学习使用NumPy库进行数组操作和数学计算。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "NumPy基础",
                        "url": "https://example.com/video6",
                        "duration": "28:30"
                    }
                ],
                "exercises": [
                    {
                        "id": 2,
                        "type": "programming",
                        "title": "NumPy数组练习",
                        "description": "使用NumPy创建和操作数组",
                        "template": "# 请编写代码使用NumPy\nimport numpy as np\n\n# 创建一个3x3的随机数组\narr = np.random.rand(3, 3)\nprint('随机数组:')\nprint(arr)\n\n# 计算数组的均值\n# 请添加代码\n\n# 计算数组的最大值\n# 请添加代码",
                        "solution": "# 解决方案\nimport numpy as np\n\n# 创建一个3x3的随机数组\narr = np.random.rand(3, 3)\nprint('随机数组:')\nprint(arr)\n\n# 计算数组的均值\nmean = np.mean(arr)\nprint(f'数组均值: {mean}')\n\n# 计算数组的最大值\nmax_val = np.max(arr)\nprint(f'数组最大值: {max_val}')"
                    }
                ],
                "assessments": [
                    {
                        "id": 2,
                        "type": "multiple_choice",
                        "question": "NumPy中创建全零数组的函数是？",
                        "options": [
                            "np.zeros()",
                            "np.ones()",
                            "np.empty()",
                            "np.full()"
                        ],
                        "correct_answer": 0
                    }
                ]
            },
            {
                "id": 3,
                "title": "Pandas数据处理",
                "content": "学习使用Pandas库进行数据处理和分析。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "Pandas基础",
                        "url": "https://example.com/video7",
                        "duration": "30:45"
                    }
                ],
                "exercises": [
                    {
                        "id": 3,
                        "type": "programming",
                        "title": "Pandas数据处理练习",
                        "description": "使用Pandas处理数据",
                        "template": "# 请编写代码使用Pandas\nimport pandas as pd\n\n# 创建一个简单的DataFrame\ndata = {'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35], 'score': [85, 90, 95]}\ndf = pd.DataFrame(data)\nprint('原始数据:')\nprint(df)\n\n# 计算平均年龄\n# 请添加代码\n\n# 筛选分数大于90的行\n# 请添加代码",
                        "solution": "# 解决方案\nimport pandas as pd\n\n# 创建一个简单的DataFrame\ndata = {'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35], 'score': [85, 90, 95]}\ndf = pd.DataFrame(data)\nprint('原始数据:')\nprint(df)\n\n# 计算平均年龄\naverage_age = df['age'].mean()\nprint(f'平均年龄: {average_age}')\n\n# 筛选分数大于90的行\nhigh_score = df[df['score'] > 90]\nprint('分数大于90的行:')\nprint(high_score)"
                    }
                ],
                "assessments": [
                    {
                        "id": 3,
                        "type": "multiple_choice",
                        "question": "Pandas中读取CSV文件的函数是？",
                        "options": [
                            "pd.read_csv()",
                            "pd.read_excel()",
                            "pd.read_json()",
                            "pd.read_sql()"
                        ],
                        "correct_answer": 0
                    }
                ]
            },
            {
                "id": 4,
                "title": "数据清洗与预处理",
                "content": "学习如何清洗和预处理数据，提高数据质量。",
                "learning_resources": [
                    {
                        "type": "video",
                        "title": "数据清洗技巧",
                        "url": "https://example.com/video8",
                        "duration": "25:15"
                    }
                ],
                "exercises": [
                    {
                        "id": 4,
                        "type": "programming",
                        "title": "数据清洗练习",
                        "description": "清洗包含缺失值的数据",
                        "template": "# 请编写代码清洗数据\nimport pandas as pd\nimport numpy as np\n\n# 创建包含缺失值的DataFrame\ndata = {'name': ['Alice', 'Bob', np.nan, 'David'], 'age': [25, np.nan, 35, 40], 'score': [85, 90, 95, np.nan]}\ndf = pd.DataFrame(data)\nprint('原始数据:')\nprint(df)\n\n# 填充缺失值\n# 请添加代码\n",
                        "solution": "# 解决方案\nimport pandas as pd\nimport numpy as np\n\n# 创建包含缺失值的DataFrame\ndata = {'name': ['Alice', 'Bob', np.nan, 'David'], 'age': [25, np.nan, 35, 40], 'score': [85, 90, 95, np.nan]}\ndf = pd.DataFrame(data)\nprint('原始数据:')\nprint(df)\n\n# 填充缺失值\ndf['name'] = df['name'].fillna('Unknown')\ndf['age'] = df['age'].fillna(df['age'].mean())\ndf['score'] = df['score'].fillna(df['score'].mean())\nprint('清洗后的数据:')\nprint(df)"
                    }
                ],
                "assessments": [
                    {
                        "id": 4,
                        "type": "multiple_choice",
                        "question": "以下哪种方法可以处理缺失值？",
                        "options": [
                            "删除包含缺失值的行",
                            "填充缺失值",
                            "忽略缺失值",
                            "以上都是"
                        ],
                        "correct_answer": 3
                    }
                ]
            }
        ],
        "duration": "6周",
        "image": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=python%20data%20analysis%20with%20pandas%20and%20numpy%2C%20colorful%20cartoon%20style&image_size=square"
    }
]

# 根据ID获取课程
def get_course_by_id(course_id):
    for course in courses:
        if course['id'] == course_id:
            return course
    return None

# 根据课程ID和模块ID获取模块
def get_module_by_id(course_id, module_id):
    course = get_course_by_id(course_id)
    if course:
        for module in course['modules']:
            if module['id'] == module_id:
                return module
    return None

# 根据难度级别获取课程
def get_courses_by_level(level):
    return [course for course in courses if course['level'] == level]

# 获取所有课程
def get_all_courses():
    return courses

# 获取模块的学习资源
def get_learning_resources(course_id, module_id):
    module = get_module_by_id(course_id, module_id)
    if module and 'learning_resources' in module:
        return module['learning_resources']
    return []

# 获取模块的练习
def get_exercises(course_id, module_id):
    module = get_module_by_id(course_id, module_id)
    if module and 'exercises' in module:
        return module['exercises']
    return []

# 获取模块的测评
def get_assessments(course_id, module_id):
    module = get_module_by_id(course_id, module_id)
    if module and 'assessments' in module:
        return module['assessments']
    return []

# 根据ID获取练习
def get_exercise_by_id(course_id, module_id, exercise_id):
    exercises = get_exercises(course_id, module_id)
    for exercise in exercises:
        if exercise['id'] == exercise_id:
            return exercise
    return None

# 根据ID获取测评
def get_assessment_by_id(course_id, module_id, assessment_id):
    assessments = get_assessments(course_id, module_id)
    for assessment in assessments:
        if assessment['id'] == assessment_id:
            return assessment
    return None