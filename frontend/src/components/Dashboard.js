import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [asset, setAsset] = useState('');
  const [marketDirection, setMarketDirection] = useState('');
  const [indicator1, setIndicator1] = useState('');
  const [indicator2, setIndicator2] = useState('');
  const [indicator3, setIndicator3] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  const [profitExit, setProfitExit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [trades, setTrades] = useState([]);
  const [expandedTradeIds, setExpandedTradeIds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/indicators')
      .then(response => setIndicators(response.data))
      .catch(error => console.error('Error fetching indicators:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/trades')
      .then(response => setTrades(response.data))
      .catch(error => console.error('Error fetching trades:', error));
  }, []);

  const handleSubmit = () => {
    const newTrade = {
      marketDirection,
      asset,
      indicators: [indicator1, indicator2, indicator3],
      entryPrice,
      profitExit,
      stopLoss,
      investmentAmount,
    };

    axios.post('http://localhost:5000/trades', newTrade).then((response) => {
      setTrades([...trades, response.data]);
      resetForm();
    });
  };

  const resetForm = () => {
    setMarketDirection('');
    setAsset('');
    setIndicator1('');
    setIndicator2('');
    setIndicator3('');
    setEntryPrice('');
    setProfitExit('');
    setStopLoss('');
    setInvestmentAmount('');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/trades/${id}`).then(() => {
      setTrades(trades.filter((trade) => trade._id !== id));
    });
  };

  const toggleIndicators = (id) => {
    setExpandedTradeIds(expandedTradeIds.includes(id)
      ? expandedTradeIds.filter((tradeId) => tradeId !== id)
      : [...expandedTradeIds, id]);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Log a Trade
            </Typography>

            <Typography>Select Market Direction:</Typography>
            <Select
              value={marketDirection}
              onChange={(e) => setMarketDirection(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              <MenuItem value="Bullish">Bullish</MenuItem>
              <MenuItem value="Bearish">Bearish</MenuItem>
            </Select>

            <Typography>Select Asset:</Typography>
            <Select
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              {assets.map((asset) => (
                <MenuItem key={asset._id} value={asset.name}>
                  {asset.name}
                </MenuItem>
              ))}
            </Select>

            <Typography>Select First Confluence Indicator:</Typography>
            <Select
              value={indicator1}
              onChange={(e) => setIndicator1(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              {indicators.map((indicator) => (
                <MenuItem key={indicator._id} value={indicator.name}>
                  {indicator.name}
                </MenuItem>
              ))}
            </Select>

            <Typography>Select Second Confluence Indicator:</Typography>
            <Select
              value={indicator2}
              onChange={(e) => setIndicator2(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              {indicators.map((indicator) => (
                <MenuItem key={indicator._id} value={indicator.name}>
                  {indicator.name}
                </MenuItem>
              ))}
            </Select>

            <Typography>Select Third Confluence Indicator:</Typography>
            <Select
              value={indicator3}
              onChange={(e) => setIndicator3(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              {indicators.map((indicator) => (
                <MenuItem key={indicator._id} value={indicator.name}>
                  {indicator.name}
                </MenuItem>
              ))}
            </Select>

            <Typography>Entry Price:</Typography>
            <TextField
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />

            <Typography>Profit Exit:</Typography>
            <TextField
              value={profitExit}
              onChange={(e) => setProfitExit(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />

            <Typography>Stop Loss:</Typography>
            <TextField
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />

            <Typography>Investment Amount:</Typography>
            <TextField
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              style={{ marginTop: '16px' }}
            >
              LOG TRADE
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Logged Trades
            </Typography>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Market Direction</TableCell>
                  <TableCell>Asset</TableCell>
                  <TableCell>Entry</TableCell>
                  <TableCell>Profit Exit</TableCell>
                  <TableCell>Stop Loss</TableCell>
                  <TableCell>Investment</TableCell>
                  <TableCell>Date Logged</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trades.map((trade) => (
                  <React.Fragment key={trade._id}>
                    <TableRow>
                      <TableCell>{trade.marketDirection}</TableCell>
                      <TableCell>{trade.asset}</TableCell>
                      <TableCell>${trade.entryPrice}</TableCell>
                      <TableCell>${trade.profitExit}</TableCell>
                      <TableCell>${trade.stopLoss}</TableCell>
                      <TableCell>${trade.investmentAmount || 'N/A'}</TableCell>
                      <TableCell>{new Date(trade.loggedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => toggleIndicators(trade._id)}>
                          {expandedTradeIds.includes(trade._id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton onClick={() => handleDelete(trade._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={expandedTradeIds.includes(trade._id)} timeout="auto" unmountOnExit>
                          <Paper style={{ margin: 8, padding: 16 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Indicators Used:
                            </Typography>
                            {trade.indicators.map((indicator, i) => (
                              <Typography key={i}>
                                {indicator}
                              </Typography>
                            ))}
                          </Paper>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
