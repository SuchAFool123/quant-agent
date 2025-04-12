import akshare as ak
import time
from requests.exceptions import RequestException
import pandas as pd

def get_stock_data(stock_code, max_retries=3, timeout=10):
    for attempt in range(max_retries):
        try:
            print(f"尝试获取股票 {stock_code} 数据 (第 {attempt + 1} 次尝试)")
            
            # 获取股票实时行情
            print("正在获取实时行情...")
            stock_data = ak.stock_zh_a_spot_em()
            print(f"成功获取实时行情，共 {len(stock_data)} 条记录")
            
            # 检查股票代码是否存在
            stock_info = stock_data[stock_data['代码'] == stock_code]
            if stock_info.empty:
                return {'error': f'未找到股票代码: {stock_code}'}
            
            stock_info = stock_info.to_dict('records')[0]
            print(f"成功获取股票 {stock_code} 基本信息")
            
            # 获取K线数据
            print("正在获取K线数据...")
            k_data = ak.stock_zh_a_hist(symbol=stock_code, period="daily")
            print(f"成功获取K线数据，共 {len(k_data)} 条记录")
            
            return {
                'basic_info': stock_info,
                'k_data': k_data.to_dict('records')
            }
        except RequestException as e:
            print(f"网络请求错误: {str(e)}")
            if attempt == max_retries - 1:
                return {'error': f'请求超时: {str(e)}'}
            print(f"等待1秒后重试...")
            time.sleep(1)
        except pd.errors.EmptyDataError:
            print(f"未找到股票数据")
            return {'error': f'未找到股票数据: {stock_code}'}
        except Exception as e:
            print(f"发生错误: {str(e)}")
            return {'error': str(e)} 