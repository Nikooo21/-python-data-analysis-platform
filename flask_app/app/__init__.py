from flask import Flask
import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()


def create_app():
    # 创建 Flask 应用实例
    app = Flask(__name__)
    
    # 配置应用
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')
    
    # 注册蓝图
    from app.routes import main
    app.register_blueprint(main)
    
    return app