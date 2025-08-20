import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({ asset: '', price: '', quantity: '' });
  const [assets, setAssets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTrade, setEditingTrade] = useState({ asset: '', price: '', quantity: '' });

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

  const startEdit = (trade) => {
    setEditingId(trade._id);
    setEditingTrade({
      asset: trade.asset._id,
      price: trade.price,
      quantity: trade.quantity,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTrade({ asset: '', price: '', quantity: '' });
  };

  const updateTrade = async () => {
    try {
      const response = await axios.put(`/api/trades/${editingId}`, editingTrade);
      setTrades(trades.map((trade) => (trade._id === editingId ? response.data : trade)));
      cancelEdit();
    } catch (error) {
      console.error('Error updating trade:', error);
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
            {editingId === trade._id ? (
              <>
                <TextField
                  select
                  value={editingTrade.asset}
                  onChange={(e) => setEditingTrade({ ...editingTrade, asset: e.target.value })}
                >
                  {assets.map((asset) => (
                    <MenuItem key={asset._id} value={asset._id}>
                      {asset.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={editingTrade.price}
                  onChange={(e) => setEditingTrade({ ...editingTrade, price: e.target.value })}
                />
                <TextField
                  value={editingTrade.quantity}
                  onChange={(e) => setEditingTrade({ ...editingTrade, quantity: e.target.value })}
                />
                <Button onClick={updateTrade}>Save</Button>
                <Button onClick={cancelEdit}>Cancel</Button>
              </>
            ) : (
              <>
                {trade.asset.name} - {trade.price} - {trade.quantity}
                <Button onClick={() => startEdit(trade)}>Edit</Button>
                <Button onClick={() => deleteTrade(trade._id)}>Delete</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeList;
