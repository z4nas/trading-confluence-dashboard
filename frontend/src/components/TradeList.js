import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({ asset: '', price: '', quantity: '' });
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetchTrades();
    fetchAssets();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await axios.get('/api/trades');
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get('/api/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const addTrade = async () => {
    try {
      const response = await axios.post('/api/trades', newTrade);
      setTrades([...trades, response.data]);
      setNewTrade({ asset: '', price: '', quantity: '' });
    } catch (error) {
      console.error('Error adding trade:', error);
    }
  };

  const deleteTrade = async (id) => {
    try {
      await axios.delete(`/api/trades/${id}`);
      setTrades(trades.filter((trade) => trade._id !== id));
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  };

  return (
    <div>
      <h2>Trade List</h2>
      <TextField
        label="Asset"
        select
        value={newTrade.asset}
        onChange={(e) => setNewTrade({ ...newTrade, asset: e.target.value })}
      >
        {assets.map((asset) => (
          <MenuItem key={asset._id} value={asset._id}>
            {asset.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Price"
        value={newTrade.price}
        onChange={(e) => setNewTrade({ ...newTrade, price: e.target.value })}
      />
      <TextField
        label="Quantity"
        value={newTrade.quantity}
        onChange={(e) => setNewTrade({ ...newTrade, quantity: e.target.value })}
      />
      <Button onClick={addTrade}>Add Trade</Button>
      <ul>
        {trades.map((trade) => (
          <li key={trade._id}>
            {trade.asset.name} - {trade.price} - {trade.quantity}
            <Button onClick={() => deleteTrade(trade._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeList;
