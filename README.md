# QuantML-Agent: A股市场分析助手

QuantML-Agent是一个基于人工智能的A股市场分析工具，结合了大语言模型和量化分析技术，为投资者提供全面的市场洞察和个股分析。
（目前功能还不完善，仅供学习参考使用）

## 功能特点

### 市场分析
- **实时指数监控**：展示上证指数、深证成指、创业板指等主要指数的实时行情
- **市场情绪仪表盘**：通过AI分析市场情绪，提供贪婪/恐慌指数
- **趋势预测**：提供短期、中期和长期市场趋势预测
- **热点板块分析**：识别并评估市场热点板块的投资机会

### 个股分析
- **K线图表**：专业的K线图展示，支持多种技术指标
- **基本面数据**：展示个股的关键基本面数据
- **成交量分析**：直观展示成交量变化
- **数据缩放**：灵活查看不同时间范围的数据

### 研报与新闻分析
- **研报解读**：AI驱动的研报摘要和解读
- **新闻分析**：实时新闻聚合与AI分析
- **市场影响评估**：评估新闻和研报对市场的潜在影响

## 技术架构

### 前端
- React.js框架
- ECharts图表库
- 响应式设计，适配多种设备

### 后端
- Python Flask API
- AKShare数据接口
- DeepSeek API集成
- 数据处理与分析模块

## 快速开始

### 环境要求
- Node.js 14+
- Python 3.8+
- 网络连接（用于获取实时数据）

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/QuantML-Github/quantml-agent.git
cd quantml-agent
```

2. 安装后端依赖
```bash
cd backend
pip install -r requirements.txt
```

3. 配置环境变量
```bash
# 创建.env文件
cp .env.example .env
# 编辑.env文件，添加必要的API密钥
```

4. 安装前端依赖
```bash
cd ../frontend
npm install
```

5. 启动应用
```bash
# 启动后端
cd ../backend
python app.py

# 新开一个终端，启动前端
cd ../frontend
npm start
```

6. 访问应用
浏览器打开 http://localhost:3000

## 数据来源

- A股市场数据：通过AKShare获取
- 新闻和研报：从多个金融媒体和券商研究所获取
- 市场分析：基于OpenAI大语言模型

## 开发计划

- [ ] 添加更多技术指标
- [ ] 实现个性化投资组合分析
- [ ] 增加历史回测功能
- [ ] 开发移动端应用
- [ ] 添加用户账户系统

## 贡献指南

欢迎贡献代码、报告问题或提出新功能建议。请遵循以下步骤：

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证

## 免责声明

QuantML-Agent仅供学习和研究使用，不构成投资建议。投资决策请基于您自己的判断，并自行承担风险。

## 联系方式

项目维护者: quantml@126.com

---

*注意：本项目是一个演示应用，旨在展示AI与金融数据分析的结合。实际投资决策需谨慎。*
