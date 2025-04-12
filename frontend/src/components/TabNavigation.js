import React from 'react';

function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="tab-navigation">
      <button 
        className={`tab-button ${activeTab === 'market' ? 'active' : ''}`}
        onClick={() => setActiveTab('market')}
      >
        市场分析
      </button>
      <button 
        className={`tab-button ${activeTab === 'stock' ? 'active' : ''}`}
        onClick={() => setActiveTab('stock')}
      >
        个股分析
      </button>
    </div>
  );
}

export default TabNavigation; 