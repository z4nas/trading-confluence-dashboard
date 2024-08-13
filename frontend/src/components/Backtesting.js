import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const Backtesting = () => {
  const [asset, setAsset] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [strategyParams, setStrategyParams] = useState({
    movingAverage: '',
    rsi: '',
    macd: ''
  });
  const [backtestResult, setBacktestResult] = useState(null);

  const handleBacktest = () => {
    // Implement backtesting logic here
    const result = {
      totalProfitLoss: 5000,
      winLossRatio: 2,
      averageTradeReturn: 3
    };
    setBacktestResult(result);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Backtesting
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Backtesting Configuration
            </Typography>
            <Select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              {/* Populate with assets from your API */}
              <MenuItem value="Bitcoin">Bitcoin</MenuItem>
              <MenuItem value="Apple">Apple</MenuItem>
            </Select>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
              InputLabelProps={{ shrink: true }}
            />
            <Typography variant="h6" gutterBottom>
              Strategy Parameters
            </Typography>
            <TextField
              label="Moving Average"
              value={strategyParams.movingAverage}
              onChange={(e) => setStrategyParams({ ...strategyParams, movingAverage: e.target.value })}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="RSI"
              value={strategyParams.rsi}
              onChange={(e) => setStrategyParams({ ...strategyParams, rsi: e.target.value })}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="MACD"
              value={strategyParams.macd}
              onChange={(e) => setStrategyParams({ ...strategyParams, macd: e.target.value })}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" onClick={handleBacktest} fullWidth>
              Run Backtest
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            {backtestResult ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Backtesting Results
                </Typography>
                <Typography>Total Profit/Loss: ${backtestResult.totalProfitLoss}</Typography>
                <Typography>Win/Loss Ratio: {backtestResult.winLossRatio}</Typography>
                <Typography>Average Trade Return: {backtestResult.averageTradeReturn}%</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>Export as PDF</Button>
                <Button variant="contained" color="secondary" style={{ marginTop: '16px', marginLeft: '8px' }}>Export as CSV</Button>
              </>
            ) : (
              <Typography variant="h6" gutterBottom>
                No results available. Please run a backtest.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Backtesting;
