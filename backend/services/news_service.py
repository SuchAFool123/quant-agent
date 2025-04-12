import requests
from bs4 import BeautifulSoup

def get_news():
    # 简化实现，返回静态数据
    return [
        {
            "title": "央行宣布降准0.5个百分点",
            "summary": "人民银行决定下调金融机构存款准备金率0.5个百分点，释放长期资金约1万亿元。",
            "source": "经济日报",
            "date": "2023-11-20"
        },
        {
            "title": "多部委联合发文支持民营经济发展",
            "summary": "国家发改委等多部门联合发布支持民营经济发展的政策措施，涉及融资、税收等多方面。",
            "source": "证券时报",
            "date": "2023-11-18"
        }
    ]

def get_news_from_sina():
    try:
        # 新浪财经新闻页面
        url = "https://finance.sina.com.cn/stock/"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        news_items = []
        # 根据实际DOM结构解析新闻数据
        news_list = soup.find_all('div', class_='news-item')
        
        for item in news_list[:10]:  # 获取前10条新闻
            title = item.find('h2').text
            content = item.find('p').text
            news_items.append({
                'title': title,
                'content': content
            })
            
        return news_items
    except Exception as e:
        return {'error': str(e)} 