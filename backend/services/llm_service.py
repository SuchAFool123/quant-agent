from openai import OpenAI
from config import Config

client = OpenAI(
    api_key=Config.OPENAI_API_KEY,
    base_url="https://api.deepseek.com/v1"
)

def analyze_content(content):
    try:
        # 将内容转换为适合提示的格式
        prompt = f"""
        请分析以下内容，并提供关键见解：
        {content}
        
        请从以下几个方面进行分析：
        1. 主要观点摘要
        2. 市场影响分析
        3. 投资建议
        4. 风险提示
        """
        
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一个专业的金融分析师，专注于A股市场分析。"},
                {"role": "user", "content": prompt}
            ]
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return str(e) 