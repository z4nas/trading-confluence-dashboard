import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AssetManager = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState('');

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get('/api/assets');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const addAsset = async () => {
    try {
      const response = await axios.post('/api/assets', { name: newAsset });
      setAssets([...assets, response.data]);
      setNewAsset('');
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      await axios.delete(`/api/assets/${id}`);
      setAssets(assets.filter((asset) => asset._id !== id));
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  return (
    <div>
      <h2>Asset Manager</h2>
      <TextField
        label="New Asset"
        value={newAsset}
        onChange={(e) => setNewAsset(e.target.value)}
      />
      <Button onClick={addAsset}>Add Asset</Button>
      <List>
        {assets.map((asset) => (
          <ListItem key={asset._id}>
            <ListItemText primary={asset.name} />
            <IconButton edge="end" onClick={() => deleteAsset(asset._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AssetManager;
