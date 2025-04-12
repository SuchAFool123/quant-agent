import React from 'react';

function ReportAnalysis({ data }) {
  return (
    <div className="report-analysis">
      {data.analysis && (
        <div className="analysis-summary">
          <div className="analysis-header">
            <span className="analysis-badge">DeepSeek AI 分析</span>
          </div>
          <p>{data.analysis}</p>
        </div>
      )}
      
      <div className="report-list">
        {data.reports && data.reports.map((report, index) => (
          <div className="report-item" key={index}>
            <h5 className="report-title">{report.title}</h5>
            <div className="report-meta">
              <span className="report-source">{report.source}</span>
              <span className="report-date">{report.date}</span>
            </div>
            <p className="report-summary">{report.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportAnalysis; 