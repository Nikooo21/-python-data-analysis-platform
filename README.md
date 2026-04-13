# 数据分析在线教育平台

一个专为商务数据分析与应用专业学生设计的在线教育平台，提供完整的课程体系、互动式学习模块和成就激励系统。

## 功能特点

- 📚 **完整的课程体系**：从基础到进阶的数据分析课程
- 🎯 **互动式学习模块**：学、练、测相结合，提高学习效果
- 🏆 **成就激励系统**：获得徽章和积分，提升学习动力
- 🎨 **有趣童真的界面**：让学习变得更加轻松愉快

## 技术栈

- **后端**：Python, Flask
- **前端**：HTML, CSS, JavaScript
- **数据库**：SQLite
- **部署**：Cloudflare Pages

## 项目结构

```
/workspace/
├── flask_app/
│   ├── app/
│   │   ├── static/          # 静态文件
│   │   ├── templates/       # 模板文件
│   │   ├── __init__.py
│   │   ├── achievement.py  # 成就系统
│   │   ├── courses.py    # 课程数据
│   │   └── routes.py     # 路由
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── .gitignore
└── README.md
```

## 快速开始

### 安装依赖

```bash
cd flask_app
pip install -r requirements.txt
```

### 运行项目

```bash
python app.py
```

然后访问 http://127.0.0.1:5001

## 课程内容

平台包含以下课程：

1. **数据分析基础入门**
2. **Python数据分析基础**

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
