import React, { useState, useRef, useEffect } from 'react';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatWindowRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const originalSize = useRef({ width: 380, height: 520 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // 切换聊天窗口显示状态
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // 开始拖动
  const handleMouseDown = (e) => {
    if (e.target.closest('.chatbot-header')) {
      setIsDragging(true);
      const rect = chatWindowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // 拖动中
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // 确保窗口不会被拖出屏幕
      const maxX = window.innerWidth - chatWindowRef.current.offsetWidth;
      const maxY = window.innerHeight - chatWindowRef.current.offsetHeight;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  // 结束拖动
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // 最大化/还原窗口
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className="chatbot-widget-container">
      {/* 聊天窗口 */}
      {isOpen && (
        <div 
          className={`chatbot-popup ${isDragging ? 'dragging' : ''}`}
          style={{ 
            left: isMaximized ? '0' : `${position.x}px`, 
            top: isMaximized ? '0' : `${position.y}px`,
            width: isMaximized ? '100vw' : undefined,
            height: isMaximized ? '100vh' : undefined,
            borderRadius: isMaximized ? '0' : '12px',
            bottom: 'auto',
            right: 'auto'
          }}
          ref={chatWindowRef}
          onMouseDown={handleMouseDown}
        >
          <div className="chatbot-header">
            <div className="drag-handle">AI投资助手</div>
            <div className="window-controls">
              <button className="window-button minimize" onClick={toggleChat} title="最小化">
                <span>_</span>
              </button>
              <button className="window-button maximize" onClick={toggleMaximize} title={isMaximized ? "还原" : "最大化"}>
                <span>{isMaximized ? "❐" : "□"}</span>
              </button>
              <button className="window-button close" onClick={toggleChat} title="关闭">
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="chatbot-iframe-container">
            {isLoading && (
              <div className="chatbot-loading">
                <div className="loading-spinner"></div>
                <div>正在加载AI助手...</div>
              </div>
            )}
            {loadError && (
              <div className="chatbot-error">
                <div className="error-icon">!</div>
                <div>加载失败: {loadError}</div>
                <button onClick={() => {
                  setLoadError(null);
                  setIsLoading(true);
                }}>重试</button>
              </div>
            )}
            <iframe
              src="https://udify.app/chatbot/ParQSzRJ17nuFbfK"
              style={{ 
                width: '100%', 
                height: '100%',
                display: isLoading || loadError ? 'none' : 'block'
              }}
              frameBorder="0"
              allow="microphone"
              title="AI投资助手"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setLoadError('无法连接到AI助手服务，请稍后重试');
              }}
            ></iframe>
          </div>
        </div>
      )}
      
      {/* 聊天图标按钮 */}
      <button 
        className={`chatbot-icon ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="打开AI助手"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M12 8v.01"></path>
          <path d="M12 12v.01"></path>
          <path d="M12 16v.01"></path>
        </svg>
      </button>
    </div>
  );
}

export default ChatbotWidget; 