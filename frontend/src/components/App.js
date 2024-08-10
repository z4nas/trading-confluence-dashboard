import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TradeList from './components/TradeList';
import AssetManager from './components/AssetManager';
import Notes from './components/Notes';
import Reports from './components/Reports';
import PerformanceReport from './components/PerformanceReport';

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trades">Trades</Link></li>
          <li><Link to="/assets">Assets</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/performance">Performance</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trades" element={<TradeList />} />
        <Route path="/assets" element={<AssetManager />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/performance" element={<PerformanceReport />} />
      </Routes>
    </div>
  );
};

export default App;
