import akshare as ak
import pandas as pd
import time
from requests.exceptions import RequestException
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_index_data(max_retries=3, timeout=30):
    for attempt in range(max_retries):
        try:
            logger.info(f"开始获取指数数据... (尝试 {attempt + 1}/{max_retries})")
            # 尝试使用不同的API
            index_data = ak.stock_zh_index_spot_sina()  # 使用新浪API
            logger.info(f"获取到指数数据: {len(index_data)} 条记录")
            
            # 筛选主要指数
            main_indices = ['sh000001', 'sz399001', 'sz399006']
            result = []
            
            for idx in main_indices:
                logger.info(f"处理指数 {idx}")
                index_info = index_data[index_data['代码'] == idx].to_dict('records')
                if index_info:
                    result.append(index_info[0])
                else:
                    logger.warning(f"未找到指数 {idx} 的数据")
            
            if not result:
                logger.warning("未找到任何指数数据，返回静态数据")
                raise Exception("未找到任何指数数据")
                
            logger.info(f"成功获取 {len(result)} 个指数数据")
            return result
            
        except RequestException as e:
            logger.error(f"请求异常 (尝试 {attempt + 1}/{max_retries}): {str(e)}")
            if attempt == max_retries - 1:
                logger.error("达到最大重试次数，返回静态数据")
                return [
                    {
                        "代码": "000001",
                        "名称": "上证指数",
                        "最新价": "3,210.58",
                        "涨跌幅": "1.25"
                    },
                    {
                        "代码": "399001",
                        "名称": "深证成指",
                        "最新价": "10,825.63",
                        "涨跌幅": "1.68"
                    },
                    {
                        "代码": "399006",
                        "名称": "创业板指",
                        "最新价": "2,156.32",
                        "涨跌幅": "-0.32"
                    }
                ]
            time.sleep(2)  # 增加重试间隔到2秒
            
        except Exception as e:
            logger.error(f"未知错误: {str(e)}")
            return [
                {
                    "代码": "000001",
                    "名称": "上证指数",
                    "最新价": "3,210.58",
                    "涨跌幅": "1.25"
                },
                {
                    "代码": "399001",
                    "名称": "深证成指",
                    "最新价": "10,825.63",
                    "涨跌幅": "1.68"
                },
                {
                    "代码": "399006",
                    "名称": "创业板指",
                    "最新价": "2,156.32",
                    "涨跌幅": "-0.32"
                }
            ] 