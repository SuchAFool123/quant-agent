import os
from dotenv import load_dotenv

# 指定.env文件路径
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

class Config:
    # OpenAI配置
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.deepseek.com/v1")  # 默认值
    OPENAI_MODEL_NAME = os.getenv("OPENAI_MODEL_NAME", "deepseek-chat")  # 修改默认模型名称

    
    # 数据库配置
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Flask配置
    DEBUG = os.getenv('FLASK_DEBUG', True)
    ENV = os.getenv('FLASK_ENV', 'development') 