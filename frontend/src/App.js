import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Assets from './components/Assets';
import Indicators from './components/Indicators';
import Backtesting from './components/Backtesting';
import Reports from './components/Reports';
import Settings from './components/Settings';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Trading Dashboard
          </Typography>
          <Tabs>
            <Tab label="Dashboard" component={Link} to="/" />
            <Tab label="Backtesting" component={Link} to="/backtesting" />
            <Tab label="Reports" component={Link} to="/reports" />
            <Tab label="Assets" component={Link} to="/assets" />
            <Tab label="Settings" component={Link} to="/settings" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/backtesting" element={<Backtesting />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/indicators" element={<Indicators />} />
      </Routes>
    </Router>
  );
}

export default App;
