import React from 'react';
import StockSelector from './StockSelector';
import StockChart from './StockChart';

function StockAnalysis({ selectedStock, setSelectedStock, stockData }) {
  return (
    <div className="stock-analysis">
      <h2 className="section-title">个股分析</h2>
      <StockSelector onSelect={setSelectedStock} />
      
      {!selectedStock && (
        <div className="stock-placeholder">
          <p>请在上方输入股票代码进行查询</p>
          <p>例如：600000（浦发银行）、000001（平安银行）</p>
        </div>
      )}
      
      {stockData && (
        <>
          <StockChart data={stockData} />
          
          <div className="stock-details">
            <h3>基本信息</h3>
            <div className="stock-info-grid">
              <div className="info-item">
                <span className="info-label">股票名称</span>
                <span className="info-value">{stockData.basic_info.名称}</span>
              </div>
              <div className="info-item">
                <span className="info-label">股票代码</span>
                <span className="info-value">{stockData.basic_info.代码}</span>
              </div>
              <div className="info-item">
                <span className="info-label">今开</span>
                <span className="info-value">{stockData.basic_info.今开}</span>
              </div>
              <div className="info-item">
                <span className="info-label">昨收</span>
                <span className="info-value">{stockData.basic_info.昨收}</span>
              </div>
              <div className="info-item">
                <span className="info-label">最高</span>
                <span className="info-value">{stockData.basic_info.最高}</span>
              </div>
              <div className="info-item">
                <span className="info-label">最低</span>
                <span className="info-value">{stockData.basic_info.最低}</span>
              </div>
              <div className="info-item">
                <span className="info-label">成交量</span>
                <span className="info-value">{stockData.basic_info.成交量}</span>
              </div>
              <div className="info-item">
                <span className="info-label">成交额</span>
                <span className="info-value">{stockData.basic_info.成交额}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StockAnalysis; 