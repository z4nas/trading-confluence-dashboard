import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AssetManager from './components/AssetManager';
import TradeList from './components/TradeList';
import PerformanceReport from './components/PerformanceReport';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assets" element={<AssetManager />} />
        <Route path="/trades" element={<TradeList />} />
        <Route path="/performance" element={<PerformanceReport />} />
      </Routes>
    </div>
  );
}

export default App;
