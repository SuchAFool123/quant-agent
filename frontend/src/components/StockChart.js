import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

function StockChart({ data }) {
  const [chartOption, setChartOption] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!data || !data.k_data || !data.basic_info) {
        setError('数据格式不正确');
        return;
      }

      // 检查数据格式
      console.log('股票数据:', data);
      
      // 准备K线图数据
      const kLineData = data.k_data.map(item => {
        // 确保所有必要的字段都存在
        if (!item.date || !item.open || !item.close || !item.low || !item.high) {
          console.warn('K线数据格式不完整:', item);
          return null;
        }
        return [
          item.date,
          parseFloat(item.open),  // 确保是数字
          parseFloat(item.close), // 确保是数字
          parseFloat(item.low),   // 确保是数字
          parseFloat(item.high)   // 确保是数字
        ];
      }).filter(item => item !== null); // 过滤掉无效数据

      // 成交量数据
      const volumeData = data.k_data.map(item => {
        if (!item.date || !item.volume || !item.close || !item.open) {
          return null;
        }
        return [
          item.date,
          parseFloat(item.volume), // 确保是数字
          parseFloat(item.close) > parseFloat(item.open) ? 1 : -1 // 1表示上涨，-1表示下跌
        ];
      }).filter(item => item !== null); // 过滤掉无效数据

      // 日期数据
      const dates = data.k_data.map(item => item.date).filter(date => date);

      if (kLineData.length === 0 || volumeData.length === 0) {
        setError('没有有效的K线数据');
        return;
      }

      // 图表配置
      const option = {
        title: {
          text: `${data.basic_info.名称 || '未知'} (${data.basic_info.代码 || '未知'})`,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function (params) {
            const data = params[0].data;
            return `
              <div>日期: ${data[0]}</div>
              <div>开盘: ${data[1]}</div>
              <div>收盘: ${data[2]}</div>
              <div>最低: ${data[3]}</div>
              <div>最高: ${data[4]}</div>
            `;
          }
        },
        legend: {
          data: ['K线', '成交量'],
          top: 30
        },
        grid: [
          {
            left: '10%',
            right: '10%',
            top: '15%',
            height: '55%'
          },
          {
            left: '10%',
            right: '10%',
            top: '75%',
            height: '15%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: dates,
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            axisLabel: { show: false }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            bottom: '5%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: 'K线',
            type: 'candlestick',
            data: kLineData,
            itemStyle: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143'
            },
          },
          {
            name: '成交量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volumeData,
            itemStyle: {
              color: function(params) {
                return params.data[2] > 0 ? '#ef232a' : '#14b143';
              }
            }
          }
        ]
      };

      setChartOption(option);
      setError(null);
    } catch (err) {
      console.error('处理股票数据时出错:', err);
      setError(`处理数据时出错: ${err.message}`);
    }
  }, [data]);

  // 获取涨跌幅，处理可能的格式问题
  const getPriceChange = () => {
    try {
      if (!data || !data.basic_info || !data.basic_info.涨跌幅) {
        return { value: '0.00', isUp: true };
      }
      const change = parseFloat(data.basic_info.涨跌幅);
      return { 
        value: isNaN(change) ? '0.00' : change.toFixed(2), 
        isUp: !isNaN(change) && change >= 0 
      };
    } catch (err) {
      console.error('获取涨跌幅时出错:', err);
      return { value: '0.00', isUp: true };
    }
  };

  // 获取当前价格，处理可能的格式问题
  const getCurrentPrice = () => {
    try {
      if (!data || !data.basic_info || !data.basic_info.最新价) {
        return '0.00';
      }
      return data.basic_info.最新价;
    } catch (err) {
      console.error('获取当前价格时出错:', err);
      return '0.00';
    }
  };

  const priceChange = getPriceChange();
  const currentPrice = getCurrentPrice();

  return (
    <div className="stock-chart">
      {error ? (
        <div className="chart-error">
          <p>图表加载失败: {error}</p>
          <p>请检查数据格式或刷新页面重试</p>
        </div>
      ) : (
        <>
          <div className="price-info">
            <div className="current-price">
              <span className="label">当前价:</span>
              <span className={`value ${priceChange.isUp ? 'up' : 'down'}`}>
                {currentPrice}
              </span>
            </div>
            <div className="price-change">
              <span className="label">涨跌幅:</span>
              <span className={`value ${priceChange.isUp ? 'up' : 'down'}`}>
                {priceChange.value}%
              </span>
            </div>
          </div>
          {chartOption && (
            <ReactECharts 
              option={chartOption} 
              style={{ height: '500px', width: '100%' }}
              notMerge={true}
              lazyUpdate={true}
            />
          )}
        </>
      )}
    </div>
  );
}

export default StockChart; 