import React, { useState, useEffect } from 'react';
import TabNavigation from './components/TabNavigation';
import MarketAnalysis from './components/MarketAnalysis';
import StockAnalysis from './components/StockAnalysis';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [reports, setReports] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟数据，当API请求失败时使用
  const mockReports = {
    reports: [
      {
        title: "新能源行业深度报告",
        summary: "随着碳中和政策推进，新能源行业将迎来快速发展期，建议关注光伏、风电龙头企业。",
        source: "某证券研究所",
        date: "2023-11-15"
      },
      {
        title: "半导体产业链分析",
        summary: "国产替代加速，半导体设备和材料国产化率提升，建议关注相关细分领域龙头。",
        source: "某投资银行",
        date: "2023-11-10"
      }
    ],
    analysis: "近期研报主要关注新能源和半导体行业，反映市场对科技创新和绿色发展的关注度提升。"
  };

  const mockNews = {
    news: [
      {
        title: "央行宣布降准0.5个百分点",
        summary: "人民银行决定下调金融机构存款准备金率0.5个百分点，释放长期资金约1万亿元。",
        source: "经济日报",
        date: "2023-11-20"
      },
      {
        title: "多部委联合发文支持民营经济发展",
        summary: "国家发改委等多部门联合发布支持民营经济发展的政策措施，涉及融资、税收等多方面。",
        source: "证券时报",
        date: "2023-11-18"
      }
    ],
    analysis: "近期政策面利好不断，货币政策边际宽松，有利于提振市场信心和流动性。"
  };

  useEffect(() => {
    // 获取研报和新闻数据
    setLoading(true);
    
    const fetchReportsPromise = fetch('http://127.0.0.1:5001/api/reports')
      .then(res => {
        if (!res.ok) throw new Error('研报数据获取失败');
        return res.json();
      })
      .catch(err => {
        console.error('研报数据获取错误:', err);
        // 返回模拟数据
        return mockReports;
      });
    
    const fetchNewsPromise = fetch('http://127.0.0.1:5001/api/news')
      .then(res => {
        if (!res.ok) throw new Error('新闻数据获取失败');
        return res.json();
      })
      .catch(err => {
        console.error('新闻数据获取错误:', err);
        // 返回模拟数据
        return mockNews;
      });
    
    // 使用Promise.all并添加超时处理
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('请求超时')), 30000) // 增加超时时间到30秒
    );
    
    Promise.race([
      Promise.all([fetchReportsPromise, fetchNewsPromise]),
      timeoutPromise
    ])
      .then(([reportsData, newsData]) => {
        setReports(reportsData);
        setNews(newsData);
        setError(null);
      })
      .catch(err => {
        console.error('数据加载错误:', err);
        setError(err.message);
        // 使用模拟数据
        setReports(mockReports);
        setNews(mockNews);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedStock) {
      setLoading(true);
      fetch(`http://127.0.0.1:5001/api/stock/${selectedStock}`)
        .then(res => {
          if (!res.ok) throw new Error('股票数据获取失败');
          return res.json();
        })
        .then(data => {
          setStockData(data);
          setError(null);
          // 自动切换到个股分析标签页
          setActiveTab('stock');
        })
        .catch(err => {
          console.error('股票数据获取错误:', err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedStock]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>A股市场分析助手</h1>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>
      
      <main className="app-content">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <div>数据加载中，请稍候...</div>
          </div>
        ) : error ? (
          <div className="error-banner">
            <div className="error-icon">!</div>
            <div>
              <p>API连接失败: {error}</p>
              <p>已加载模拟数据用于演示</p>
            </div>
          </div>
        ) : null}
        
        {(!loading || error) && (
          activeTab === 'market' ? (
            <MarketAnalysis reports={reports} news={news} />
          ) : (
            <StockAnalysis 
              selectedStock={selectedStock} 
              setSelectedStock={setSelectedStock} 
              stockData={stockData} 
            />
          )
        )}
      </main>
      
      <ChatbotWidget />
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} A股市场分析助手 | 数据来源: AKShare</p>
      </footer>
    </div>
  );
}

export default App; 