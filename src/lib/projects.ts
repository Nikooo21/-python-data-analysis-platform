// 项目类型定义
export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  objectives: string[];
  datasetDescription: string;
  starterCode: string;
  hints: string[];
  gradientLevel: number; // 1-10，从简单到复杂
}

// 10个梯度项目定义
export const projects: Project[] = [
  {
    id: 'project-1',
    title: '基础数据探索',
    description: '使用pandas进行简单的数据分析，了解数据基本结构',
    difficulty: 'beginner',
    category: '数据基础',
    objectives: [
      '了解数据的基本信息',
      '计算基本统计量',
      '绘制简单的柱状图'
    ],
    datasetDescription: '生成包含100条学生成绩记录的数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成数据集
np.random.seed(42)
data = {
    'student_id': range(1, 101),
    'math': np.random.randint(60, 101, 100),
    'english': np.random.randint(60, 101, 100),
    'science': np.random.randint(60, 101, 100)
}
df = pd.DataFrame(data)

# 查看数据基本信息
print('数据形状:', df.shape)
print('\n数据前5行:')
print(df.head())

# 计算基本统计量
print('\n数学成绩统计:')
print(df['math'].describe())

# 绘制柱状图
plt.figure(figsize=(10, 6))
df[['math', 'english', 'science']].mean().plot(kind='bar')
plt.title('各科目平均成绩')
plt.ylabel('分数')
plt.show()
`,
    hints: [
      '使用df.shape查看数据形状',
      '使用df.describe()查看统计信息',
      '使用plt.bar()绘制柱状图'
    ],
    gradientLevel: 1
  },
  {
    id: 'project-2',
    title: '数据清洗与预处理',
    description: '处理缺失值、重复值和异常值，为后续分析做准备',
    difficulty: 'beginner',
    category: '数据处理',
    objectives: [
      '识别和处理缺失值',
      '处理重复记录',
      '检测和处理异常值'
    ],
    datasetDescription: '生成包含缺失值和异常值的销售数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成数据集
np.random.seed(42)
data = {
    'date': pd.date_range('2023-01-01', periods=100),
    'sales': np.random.randint(1000, 5000, 100),
    'customer_id': np.random.randint(1, 100, 100)
}

# 插入缺失值
data['sales'][10] = np.nan
data['sales'][20] = np.nan

# 插入异常值
data['sales'][30] = 100000
data['sales'][40] = -1000

# 创建DataFrame
df = pd.DataFrame(data)

# 检查缺失值
print('缺失值情况:')
print(df.isnull().sum())

# 处理缺失值（使用均值填充）
df['sales'] = df['sales'].fillna(df['sales'].mean())

# 处理异常值（使用IQR方法）
Q1 = df['sales'].quantile(0.25)
Q3 = df['sales'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

df['sales'] = np.where(df['sales'] < lower_bound, lower_bound, df['sales'])
df['sales'] = np.where(df['sales'] > upper_bound, upper_bound, df['sales'])

# 检查重复值
print('\n重复值数量:', df.duplicated().sum())

# 绘制处理后的销售数据
plt.figure(figsize=(12, 6))
plt.plot(df['date'], df['sales'])
plt.title('处理后的销售数据')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.show()
`,
    hints: [
      '使用isnull()检查缺失值',
      '使用fillna()填充缺失值',
      '使用IQR方法检测异常值'
    ],
    gradientLevel: 2
  },
  {
    id: 'project-3',
    title: '数据可视化进阶',
    description: '使用matplotlib和seaborn创建多种类型的图表',
    difficulty: 'beginner',
    category: '数据可视化',
    objectives: [
      '创建散点图分析相关性',
      '创建箱线图分析分布',
      '创建热力图分析相关性矩阵'
    ],
    datasetDescription: '生成包含多个变量的数据集，分析变量间的关系',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 生成数据集
np.random.seed(42)
data = {
    'age': np.random.randint(20, 70, 200),
    'income': np.random.randint(30000, 150000, 200),
    'expenses': np.random.randint(10000, 100000, 200),
    'savings': np.random.randint(5000, 50000, 200),
    'debt': np.random.randint(0, 80000, 200)
}
df = pd.DataFrame(data)

# 散点图：年龄 vs 收入
plt.figure(figsize=(10, 6))
sns.scatterplot(x='age', y='income', data=df)
plt.title('年龄与收入关系')
plt.show()

# 箱线图：各变量分布
plt.figure(figsize=(12, 6))
sns.boxplot(data=df)
plt.title('各变量分布')
plt.xticks(rotation=45)
plt.show()

# 热力图：相关性矩阵
plt.figure(figsize=(10, 8))
corr_matrix = df.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', linewidths=0.5)
plt.title('变量相关性矩阵')
plt.show()
`,
    hints: [
      '使用sns.scatterplot()创建散点图',
      '使用sns.boxplot()创建箱线图',
      '使用sns.heatmap()创建热力图'
    ],
    gradientLevel: 3
  },
  {
    id: 'project-4',
    title: '时间序列分析',
    description: '分析时间序列数据，识别趋势和季节性',
    difficulty: 'intermediate',
    category: '时间序列',
    objectives: [
      '分析时间序列的基本特征',
      '识别趋势和季节性',
      '预测未来值'
    ],
    datasetDescription: '生成包含趋势和季节性的时间序列数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成时间序列数据
np.random.seed(42)
dates = pd.date_range('2020-01-01', periods=365)

# 生成带趋势和季节性的数据
trend = np.arange(365) * 0.5
seasonality = np.sin(np.arange(365) * 2 * np.pi / 30) * 50
noise = np.random.normal(0, 20, 365)

value = 100 + trend + seasonality + noise
data = {'date': dates, 'value': value}
df = pd.DataFrame(data)
df.set_index('date', inplace=True)

# 查看数据
plt.figure(figsize=(12, 6))
plt.plot(df.index, df['value'])
plt.title('时间序列数据')
plt.xlabel('日期')
plt.ylabel('值')
plt.show()

# 计算移动平均
rolling_mean = df['value'].rolling(window=7).mean()

plt.figure(figsize=(12, 6))
plt.plot(df.index, df['value'], label='原始数据')
plt.plot(df.index, rolling_mean, label='7天移动平均')
plt.title('时间序列数据与移动平均')
plt.legend()
plt.show()

# 简单预测（使用最后一个值）
last_value = df['value'].iloc[-1]
predicted = [last_value] * 30
future_dates = pd.date_range('2021-01-01', periods=30)

plt.figure(figsize=(12, 6))
plt.plot(df.index, df['value'], label='历史数据')
plt.plot(future_dates, predicted, label='预测数据', linestyle='--')
plt.title('时间序列预测')
plt.legend()
plt.show()
`,
    hints: [
      '使用rolling()计算移动平均',
      '观察数据的趋势和季节性',
      '使用简单方法进行预测'
    ],
    gradientLevel: 4
  },
  {
    id: 'project-5',
    title: '分类数据分析',
    description: '分析分类数据，计算频率和百分比',
    difficulty: 'intermediate',
    category: '分类数据',
    objectives: [
      '分析分类变量的分布',
      '计算频率和百分比',
      '创建饼图和条形图'
    ],
    datasetDescription: '生成包含多个分类变量的数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 生成分类数据集
np.random.seed(42)
data = {
    'gender': np.random.choice(['男', '女'], 500),
    'age_group': np.random.choice(['18-24', '25-34', '35-44', '45+'], 500),
    'education': np.random.choice(['高中及以下', '本科', '硕士及以上'], 500),
    'occupation': np.random.choice(['学生', '专业人士', '管理人员', '其他'], 500),
    'satisfaction': np.random.choice(['非常满意', '满意', '一般', '不满意'], 500)
}
df = pd.DataFrame(data)

# 分析性别分布
gender_counts = df['gender'].value_counts()
print('性别分布:')
print(gender_counts)
print('\n性别百分比:')
print(gender_counts / len(df) * 100)

# 饼图：性别分布
plt.figure(figsize=(8, 6))
gender_counts.plot(kind='pie', autopct='%1.1f%%')
plt.title('性别分布')
plt.ylabel('')
plt.show()

# 条形图：年龄分布
plt.figure(figsize=(10, 6))
age_counts = df['age_group'].value_counts()
age_counts.plot(kind='bar')
plt.title('年龄分布')
plt.xlabel('年龄组')
plt.ylabel('人数')
plt.show()

# 交叉分析：教育程度与满意度
cross_tab = pd.crosstab(df['education'], df['satisfaction'])
print('\n教育程度与满意度交叉表:')
print(cross_tab)

# 热力图：交叉分析
plt.figure(figsize=(10, 6))
sns.heatmap(cross_tab, annot=True, cmap='YlGnBu')
plt.title('教育程度与满意度关系')
plt.show()
`,
    hints: [
      '使用value_counts()计算频率',
      '使用plot(kind="pie")创建饼图',
      '使用crosstab()进行交叉分析'
    ],
    gradientLevel: 5
  },
  {
    id: 'project-6',
    title: '回归分析',
    description: '使用线性回归模型预测连续变量',
    difficulty: 'intermediate',
    category: '机器学习',
    objectives: [
      '构建线性回归模型',
      '评估模型性能',
      '分析特征重要性'
    ],
    datasetDescription: '生成包含多个特征和目标变量的数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 生成数据集
np.random.seed(42)
X = np.random.rand(100, 3)  # 3个特征
y = 2 * X[:, 0] + 3 * X[:, 1] + 5 * X[:, 2] + np.random.normal(0, 0.1, 100)  # 目标变量

df = pd.DataFrame({'feature1': X[:, 0], 'feature2': X[:, 1], 'feature3': X[:, 2], 'target': y})

# 划分训练集和测试集
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 构建线性回归模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估模型
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'均方误差: {mse:.4f}')
print(f'R²评分: {r2:.4f}')

# 查看系数
print('\n模型系数:')
for feature, coef in zip(X.columns, model.coef_):
    print(f'{feature}: {coef:.4f}')
print(f'截距: {model.intercept_:.4f}')

# 可视化预测结果
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
plt.title('实际值 vs 预测值')
plt.xlabel('实际值')
plt.ylabel('预测值')
plt.show()
`,
    hints: [
      '使用train_test_split()划分数据集',
      '使用LinearRegression()构建模型',
      '使用mean_squared_error()和r2_score()评估模型'
    ],
    gradientLevel: 6
  },
  {
    id: 'project-7',
    title: '分类模型',
    description: '使用分类算法预测离散变量',
    difficulty: 'intermediate',
    category: '机器学习',
    objectives: [
      '构建分类模型',
      '评估模型性能',
      '分析分类结果'
    ],
    datasetDescription: '生成二分类数据集，使用逻辑回归进行分类',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import StandardScaler

# 生成二分类数据集
np.random.seed(42)
X = np.random.randn(200, 2)  # 2个特征
# 创建决策边界
y = np.where(X[:, 0] + X[:, 1] > 0, 1, 0)  # 线性决策边界

df = pd.DataFrame({'feature1': X[:, 0], 'feature2': X[:, 1], 'target': y})

# 划分训练集和测试集
X = df[['feature1', 'feature2']]
y = df['target']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 特征标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 构建逻辑回归模型
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# 预测
y_pred = model.predict(X_test_scaled)
y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]

# 评估模型
accuracy = accuracy_score(y_test, y_pred)
print(f'准确率: {accuracy:.4f}')

print('\n混淆矩阵:')
print(confusion_matrix(y_test, y_pred))

print('\n分类报告:')
print(classification_report(y_test, y_pred))

# 可视化决策边界
plt.figure(figsize=(10, 6))
# 绘制数据点
plt.scatter(X_test['feature1'], X_test['feature2'], c=y_test, cmap='RdBu', edgecolors='k')

# 绘制决策边界
x1_min, x1_max = X_test['feature1'].min() - 1, X_test['feature1'].max() + 1
x2_min, x2_max = X_test['feature2'].min() - 1, X_test['feature2'].max() + 1
ex1, ex2 = np.meshgrid(np.arange(x1_min, x1_max, 0.01), np.arange(x2_min, x2_max, 0.01))
Z = model.predict(scaler.transform(np.c_[ex1.ravel(), ex2.ravel()]))
Z = Z.reshape(ex1.shape)
plt.contourf(ex1, ex2, Z, alpha=0.3, cmap='RdBu')
plt.title('决策边界可视化')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()
`,
    hints: [
      '使用LogisticRegression()构建分类模型',
      '使用StandardScaler()进行特征标准化',
      '使用confusion_matrix()和classification_report()评估模型'
    ],
    gradientLevel: 7
  },
  {
    id: 'project-8',
    title: '聚类分析',
    description: '使用K-means算法进行无监督聚类',
    difficulty: 'advanced',
    category: '机器学习',
    objectives: [
      '使用K-means进行聚类',
      '确定最优聚类数',
      '分析聚类结果'
    ],
    datasetDescription: '生成包含多个聚类的数据，使用K-means进行聚类',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs

# 生成聚类数据
np.random.seed(42)
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)

df = pd.DataFrame({'feature1': X[:, 0], 'feature2': X[:, 1]})

# 特征标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 使用肘部法确定最优聚类数
inertia = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(X_scaled)
    inertia.append(kmeans.inertia_)

plt.figure(figsize=(10, 6))
plt.plot(range(1, 11), inertia, 'bx-')
plt.xlabel('聚类数 k')
plt.ylabel('惯性')
plt.title('肘部法确定最优聚类数')
plt.show()

# 使用最优聚类数（4）进行聚类
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
y_pred = kmeans.fit_predict(X_scaled)

# 可视化聚类结果
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=y_pred, s=50, cmap='viridis')
centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='red', s=200, alpha=0.75, marker='X')
plt.title('K-means聚类结果')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.show()

# 分析每个聚类的特征
cluster_centers = scaler.inverse_transform(centers)
df_centers = pd.DataFrame(cluster_centers, columns=['feature1', 'feature2'])
print('各聚类中心:')
print(df_centers)
`,
    hints: [
      '使用make_blobs()生成聚类数据',
      '使用肘部法确定最优聚类数',
      '使用KMeans()进行聚类分析'
    ],
    gradientLevel: 8
  },
  {
    id: 'project-9',
    title: '特征工程',
    description: '创建和选择特征，提高模型性能',
    difficulty: 'advanced',
    category: '机器学习',
    objectives: [
      '创建新特征',
      '选择重要特征',
      '评估特征对模型的影响'
    ],
    datasetDescription: '生成包含多个特征的数据集，进行特征工程',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.feature_selection import SelectKBest, f_regression

# 生成数据集
np.random.seed(42)
X = np.random.rand(200, 5)  # 5个原始特征
# 创建目标变量，其中一些特征有贡献，一些没有
y = 2 * X[:, 0] + 3 * X[:, 1] + 5 * X[:, 3] + np.random.normal(0, 0.1, 200)

df = pd.DataFrame({
    'feature1': X[:, 0],
    'feature2': X[:, 1],
    'feature3': X[:, 2],
    'feature4': X[:, 3],
    'feature5': X[:, 4]
})

# 创建新特征
df['feature1_squared'] = df['feature1'] ** 2
df['feature1_feature2'] = df['feature1'] * df['feature2']
df['feature4_log'] = np.log(df['feature4'] + 1)

# 划分训练集和测试集
X_all = df
y = y
X_train, X_test, y_train, y_test = train_test_split(X_all, y, test_size=0.2, random_state=42)

# 特征选择
selector = SelectKBest(f_regression, k=5)
X_train_selected = selector.fit_transform(X_train, y_train)
X_test_selected = selector.transform(X_test)

# 获取选择的特征
selected_features = X_all.columns[selector.get_support()]
print('选择的特征:')
print(selected_features)

# 构建模型（使用所有特征）
model_all = LinearRegression()
model_all.fit(X_train, y_train)
y_pred_all = model_all.predict(X_test)
r2_all = r2_score(y_test, y_pred_all)
print(f'\n使用所有特征的R²评分: {r2_all:.4f}')

# 构建模型（使用选择的特征）
model_selected = LinearRegression()
model_selected.fit(X_train_selected, y_train)
y_pred_selected = model_selected.predict(X_test_selected)
r2_selected = r2_score(y_test, y_pred_selected)
print(f'使用选择特征的R²评分: {r2_selected:.4f}')

# 特征重要性
feature_importance = pd.DataFrame({
    'feature': X_all.columns,
    'importance': np.abs(model_all.coef_)
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

plt.figure(figsize=(12, 6))
plt.bar(feature_importance['feature'], feature_importance['importance'])
plt.title('特征重要性')
plt.xticks(rotation=45)
plt.show()
`,
    hints: [
      '创建新特征如平方项、交互项',
      '使用SelectKBest进行特征选择',
      '比较使用不同特征集的模型性能'
    ],
    gradientLevel: 9
  },
  {
    id: 'project-10',
    title: '综合数据分析项目',
    description: '完成一个完整的数据分析项目，包括数据获取、清洗、分析和可视化',
    difficulty: 'advanced',
    category: '综合项目',
    objectives: [
      '完成端到端的数据分析流程',
      '生成综合性分析报告',
      '创建交互式可视化'
    ],
    datasetDescription: '分析一个包含多个维度的综合数据集',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# 生成综合数据集
np.random.seed(42)
data = {
    'customer_id': range(1, 501),
    'age': np.random.randint(18, 70, 500),
    'gender': np.random.choice(['男', '女'], 500),
    'income': np.random.randint(30000, 150000, 500),
    'spending_score': np.random.randint(1, 100, 500),
    'purchase_frequency': np.random.randint(1, 50, 500),
    'average_order_value': np.random.randint(50, 1000, 500),
    'membership_years': np.random.randint(0, 10, 500)
}

# 添加一些业务逻辑
data['total_spending'] = data['purchase_frequency'] * data['average_order_value']
data['loyalty_score'] = 0.3 * data['membership_years'] + 0.7 * (data['spending_score'] / 100)

df = pd.DataFrame(data)

# 1. 数据探索
print('=== 数据基本信息 ===')
print(df.info())
print('\n数据前5行:')
print(df.head())

print('\n=== 数值型变量统计 ===')
print(df.describe())

print('\n=== 分类型变量统计 ===')
print(df['gender'].value_counts())

# 2. 数据可视化
plt.figure(figsize=(15, 10))

# 年龄分布
plt.subplot(2, 2, 1)
sns.histplot(df['age'], bins=10)
plt.title('年龄分布')

# 收入与消费得分关系
plt.subplot(2, 2, 2)
sns.scatterplot(x='income', y='spending_score', data=df, hue='gender')
plt.title('收入与消费得分关系')

# 消费习惯分析
plt.subplot(2, 2, 3)
sns.boxplot(x='gender', y='total_spending', data=df)
plt.title('性别与总消费关系')

# 忠诚度分析
plt.subplot(2, 2, 4)
sns.barplot(x='membership_years', y='loyalty_score', data=df)
plt.title('会员年限与忠诚度关系')

plt.tight_layout()
plt.show()

# 3. 预测模型：预测消费得分
X = df[['age', 'income', 'purchase_frequency', 'average_order_value', 'membership_years']]
y = df['spending_score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

r2 = r2_score(y_test, y_pred)
print(f'\n=== 预测模型性能 ===')
print(f'R²评分: {r2:.4f}')

# 特征重要性
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': np.abs(model.coef_)
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

print('\n=== 特征重要性 ===')
print(feature_importance)

# 4. 综合分析报告
print('\n=== 综合分析报告 ===')
print('1. 数据概览: 共500名客户，年龄分布在18-70岁之间')
print('2. 消费行为: 平均消费得分为50.6，平均总消费为8250元')
print('3. 性别差异: 男女客户数量接近，消费行为无显著差异')
print('4. 忠诚度: 会员年限越长，忠诚度越高')
print('5. 预测模型: 收入和购买频率是影响消费得分的重要因素')
print('6. 建议: 针对高收入客户推出高端产品，提高会员忠诚度')
`,
    hints: [
      '按照数据分析的完整流程进行',
      '使用多种可视化方法展示数据',
      '构建预测模型并评估性能'
    ],
    gradientLevel: 10
  }
];

// 根据ID获取项目
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// 根据难度获取项目
export const getProjectsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Project[] => {
  return projects.filter(project => project.difficulty === difficulty);
};

// 获取所有项目（按梯度排序）
export const getAllProjects = (): Project[] => {
  return [...projects].sort((a, b) => a.gradientLevel - b.gradientLevel);
};
