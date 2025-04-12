import React, { useState, useEffect } from 'react';
import ReportAnalysis from './ReportAnalysis';
import NewsAnalysis from './NewsAnalysis';
import MarketPrediction from './MarketPrediction';

function MarketAnalysis({ reports, news }) {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 尝试获取指数数据
    fetch('http://127.0.0.1:5001/api/indices')
      .then(res => {
        if (!res.ok) {
          throw new Error('网络请求失败');
        }
        return res.json();
      })
      .then(data => {
        console.log('Received indices data:', data); // 添加日志
        // 确保data是数组
        if (Array.isArray(data)) {
          setIndices(data);
        } else {
          // 如果不是数组，设置为空数组并记录错误
          console.error('Indices data is not an array:', data);
          setIndices([]);
          if (data && data.error) {
            setError(data.error);
          } else {
            setError('返回数据格式错误');
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching indices:', err);
        setError(err.message);
        // 设置模拟数据
        setIndices([
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
        ]);
        setLoading(false);
      });
  }, []);

  // 指数名称映射
  const indexNames = {
    '000001': '上证指数',
    '399001': '深证成指',
    '399006': '创业板指'
  };

  return (
    <div className="market-analysis">
      <h2 className="section-title">市场概览</h2>
      <div className="market-summary">
        <div className="market-indices">
          <h3>大盘指数</h3>
          
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <div>加载中...</div>
            </div>
          ) : error ? (
            <div className="error">
              <div className="error-icon">!</div>
              <div>加载失败: {error}</div>
            </div>
          ) : indices.length === 0 ? (
            <div className="error">暂无指数数据</div>
          ) : (
            <div className="indices-grid">
              {indices.map((index, i) => (
                <div className="index-card" key={index.代码 || i}>
                  <div className="index-name">{indexNames[index.代码] || index.名称 || '未知指数'}</div>
                  <div className={`index-value ${parseFloat(index.涨跌幅 || 0) >= 0 ? 'up' : 'down'}`}>
                    {index.最新价 || 'N/A'}
                  </div>
                  <div className={`index-change ${parseFloat(index.涨跌幅 || 0) >= 0 ? 'up' : 'down'}`}>
                    {parseFloat(index.涨跌幅 || 0) >= 0 ? '+' : ''}{index.涨跌幅 || '0.00'}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prediction-section">
        <MarketPrediction />
      </div>
      
      <h3 className="section-subtitle">市场分析</h3>
      <div className="analysis-section">
        <div className="analysis-card">
          <h4 className="analysis-title">研报解读</h4>
          {reports && <ReportAnalysis data={reports} />}
        </div>
        <div className="analysis-card">
          <h4 className="analysis-title">新闻分析</h4>
          {news && <NewsAnalysis data={news} />}
        </div>
      </div>
    </div>
  );
}

export default MarketAnalysis; 