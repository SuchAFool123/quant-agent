import React, { useState } from 'react';

function StockSelector({ onSelect }) {
  const [stockCode, setStockCode] = useState('');
  const [error, setError] = useState('');

  const formatStockCode = (code) => {
    // 移除所有非数字字符
    const numbers = code.replace(/\D/g, '');
    // 限制长度为6位
    return numbers.slice(0, 6);
  };

  const validateStockCode = (code) => {
    if (code.length !== 6) {
      return '股票代码必须是6位数字';
    }
    // 验证股票代码格式
    const firstChar = code[0];
    if (!['0', '3', '6'].includes(firstChar)) {
      return '股票代码必须以0、3或6开头';
    }
    return '';
  };

  const handleChange = (e) => {
    const formattedCode = formatStockCode(e.target.value);
    setStockCode(formattedCode);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateStockCode(stockCode);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSelect(stockCode);
  };

  return (
    <div className="stock-selector">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={stockCode}
            onChange={handleChange}
            placeholder="输入股票代码（如：600000）"
            maxLength={6}
          />
          <button type="submit">查询</button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default StockSelector; 