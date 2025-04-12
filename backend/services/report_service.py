import requests
from bs4 import BeautifulSoup
import re

def get_report_summary():
    # 简化实现，返回静态数据
    return [
        {
            "title": "新能源行业深度报告",
            "summary": "随着碳中和政策推进，新能源行业将迎来快速发展期，建议关注光伏、风电龙头企业。",
            "source": "某证券研究所",
            "date": "2023-11-15"
        },
        {
            "title": "半导体产业链分析",
            "summary": "国产替代加速，半导体设备和材料国产化率提升，建议关注相关细分领域龙头。",
            "source": "某投资银行",
            "date": "2023-11-10"
        }
    ]

def get_report_summary_old():
    try:
        # 东方财富研报页面URL
        url = "http://data.eastmoney.com/report/"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        reports = []
        # 根据实际DOM结构解析研报数据
        report_items = soup.find_all('div', class_='report-item')
        
        for item in report_items[:10]:  # 获取前10条研报
            title = item.find('h3').text
            summary = item.find('p', class_='summary').text
            reports.append({
                'title': title,
                'summary': summary
            })
            
        return reports
    except Exception as e:
        return {'error': str(e)} 