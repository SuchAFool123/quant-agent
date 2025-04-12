import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

function MarketPrediction() {
  // 市场情绪指标数据
  const sentimentData = {
    bullish: 65, // 看多情绪
    bearish: 35, // 看空情绪
    fear: 42,    // 恐慌指数
    greed: 58    // 贪婪指数
  };

  // 市场预测数据
  const predictionData = {
    shortTerm: 'bullish',  // 短期预测：看多
    midTerm: 'neutral',    // 中期预测：中性
    longTerm: 'bearish'    // 长期预测：看空
  };

  // 热点板块预测
  const sectorPredictions = [
    { name: '科技', score: 85, change: '+2.3%' },
    { name: '医药', score: 72, change: '+1.5%' },
    { name: '新能源', score: 68, change: '+0.8%' },
    { name: '金融', score: 45, change: '-0.6%' },
    { name: '消费', score: 62, change: '+0.3%' }
  ];

  // 简化的情绪仪表盘配置
  const sentimentOption = {
    backgroundColor: 'transparent',
    tooltip: {
      formatter: '{b} : {c}%'
    },
    series: [
      {
        name: '市场情绪',
        type: 'gauge',
        radius: '85%',
        center: ['50%', '50%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ff4d4f' },
                { offset: 1, color: '#ff7a45' }
              ])],
              [0.7, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ffc53d' },
                { offset: 1, color: '#52c41a' }
              ])],
              [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#52c41a' },
                { offset: 1, color: '#13c2c2' }
              ])]
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '60%',
          width: 8,
          offsetCenter: [0, '5%'],
          itemStyle: {
            color: '#1890ff'
          }
        },
        axisTick: {
          length: 8,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: 'auto',
            width: 3
          }
        },
        axisLabel: {
          color: '#666',
          fontSize: 14,
          distance: -40,
          formatter: function(value) {
            if (value === 0) {
              return '极度恐慌';
            } else if (value === 50) {
              return '中性';
            } else if (value === 100) {
              return '极度贪婪';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '30%'],
          fontSize: 16,
          color: '#666'
        },
        detail: {
          fontSize: 36,
          offsetCenter: [0, '70%'],
          valueAnimation: true,
          formatter: function(value) {
            return Math.round(value) + '';
          },
          color: '#1890ff',
          fontWeight: 'bold'
        },
        data: [
          {
            value: sentimentData.greed,
            name: '市场情绪指数'
          }
        ],
        animation: true,
        animationDuration: 1000,
        animationEasing: 'bounceOut'
      }
    ]
  };

  // 热点板块预测配置
  const sectorOption = {
    backgroundColor: 'transparent',
    title: {
      text: '热点板块预测',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        const data = params[0];
        return `${data.name}: <strong>${data.value}分</strong><br/>
                预期涨跌: <span style="color:${data.value > 60 ? '#ef232a' : '#14b143'}">${sectorPredictions[data.dataIndex].change}</span>`;
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}分',
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: sectorPredictions.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 14
      }
    },
    series: [
      {
        name: '看好程度',
        type: 'bar',
        data: sectorPredictions.map(item => item.score),
        itemStyle: {
          color: function(params) {
            const score = params.value;
            if (score >= 80) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ff4d4f' },
                { offset: 1, color: '#ff7a45' }
              ]);
            } else if (score >= 60) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ff7a45' },
                { offset: 1, color: '#ffc53d' }
              ]);
            } else if (score >= 40) {
              return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#ffc53d' },
                { offset: 1, color: '#52c41a' }
              ]);
            }
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#52c41a' },
              { offset: 1, color: '#13c2c2' }
            ]);
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}分',
          color: '#666'
        },
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.2)'
          }
        },
        animationDelay: function (idx) {
          return idx * 100;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    }
  };

  // 获取趋势预测的图标和颜色
  const getTrendIcon = (trend) => {
    if (trend === 'bullish') return '↑';
    if (trend === 'bearish') return '↓';
    return '→';
  };

  const getTrendColor = (trend) => {
    if (trend === 'bullish') return 'var(--up-color)';
    if (trend === 'bearish') return 'var(--down-color)';
    return '#faad14';
  };

  const getTrendText = (trend) => {
    if (trend === 'bullish') return '看多';
    if (trend === 'bearish') return '看空';
    return '中性';
  };

  return (
    <div className="market-prediction">
      <h3 className="section-subtitle">市场预测</h3>
      
      <div className="prediction-grid">
        <div className="prediction-card sentiment-gauge">
          <h4 className="prediction-title">市场情绪</h4>
          <ReactECharts 
            option={sentimentOption} 
            style={{ height: '350px' }}
            className="sentiment-chart"
          />
          <div className="sentiment-legend">
            <div className="legend-item">
              <span className="legend-color" style={{background: 'linear-gradient(90deg, #ff4d4f, #ff7a45)'}}></span>
              <span className="legend-text">恐慌</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{background: 'linear-gradient(90deg, #ffc53d, #52c41a)'}}></span>
              <span className="legend-text">中性</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{background: 'linear-gradient(90deg, #52c41a, #13c2c2)'}}></span>
              <span className="legend-text">贪婪</span>
            </div>
          </div>
        </div>
        
        <div className="prediction-card term-prediction">
          <h4 className="prediction-title">趋势预测</h4>
          <div className="prediction-terms">
            <div className="term-item">
              <div className="term-header">
                <span className="term-label">短期(1周)</span>
                <span className="term-icon" style={{ color: getTrendColor(predictionData.shortTerm) }}>
                  {getTrendIcon(predictionData.shortTerm)}
                </span>
              </div>
              <div className="term-progress-container">
                <div 
                  className="term-progress" 
                  style={{ 
                    width: `${predictionData.shortTerm === 'bullish' ? 70 : predictionData.shortTerm === 'bearish' ? 30 : 50}%`,
                    backgroundColor: getTrendColor(predictionData.shortTerm)
                  }}
                ></div>
              </div>
              <div className="term-value" style={{ color: getTrendColor(predictionData.shortTerm) }}>
                {getTrendText(predictionData.shortTerm)}
              </div>
            </div>
            
            <div className="term-item">
              <div className="term-header">
                <span className="term-label">中期(1月)</span>
                <span className="term-icon" style={{ color: getTrendColor(predictionData.midTerm) }}>
                  {getTrendIcon(predictionData.midTerm)}
                </span>
              </div>
              <div className="term-progress-container">
                <div 
                  className="term-progress" 
                  style={{ 
                    width: `${predictionData.midTerm === 'bullish' ? 70 : predictionData.midTerm === 'bearish' ? 30 : 50}%`,
                    backgroundColor: getTrendColor(predictionData.midTerm)
                  }}
                ></div>
              </div>
              <div className="term-value" style={{ color: getTrendColor(predictionData.midTerm) }}>
                {getTrendText(predictionData.midTerm)}
              </div>
            </div>
            
            <div className="term-item">
              <div className="term-header">
                <span className="term-label">长期(3月)</span>
                <span className="term-icon" style={{ color: getTrendColor(predictionData.longTerm) }}>
                  {getTrendIcon(predictionData.longTerm)}
                </span>
              </div>
              <div className="term-progress-container">
                <div 
                  className="term-progress" 
                  style={{ 
                    width: `${predictionData.longTerm === 'bullish' ? 70 : predictionData.longTerm === 'bearish' ? 30 : 50}%`,
                    backgroundColor: getTrendColor(predictionData.longTerm)
                  }}
                ></div>
              </div>
              <div className="term-value" style={{ color: getTrendColor(predictionData.longTerm) }}>
                {getTrendText(predictionData.longTerm)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sector-prediction">
        <ReactECharts 
          option={sectorOption} 
          style={{ height: '300px' }}
          className="sector-chart"
        />
      </div>
    </div>
  );
}

export default MarketPrediction; 