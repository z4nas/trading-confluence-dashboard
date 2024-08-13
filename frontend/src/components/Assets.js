import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetTicker, setNewAssetTicker] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/assets')
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        console.error('Error fetching assets:', error);
      });
  }, []);

  const handleAddAsset = () => {
    if (newAssetName && newAssetTicker) {
      axios.post('http://localhost:5000/assets', {
        name: newAssetName,
        ticker: newAssetTicker
      })
        .then(response => {
          setAssets([...assets, response.data]);
          setNewAssetName('');
          setNewAssetTicker('');
        })
        .catch(error => {
          console.error('Error adding asset:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/assets/${id}`)
      .then(() => {
        setAssets(assets.filter(asset => asset._id !== id));
      })
      .catch(error => {
        console.error('Error deleting asset:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Asset Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Add New Asset
            </Typography>
            <TextField
              label="Asset Name"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Ticker Symbol"
              value={newAssetTicker}
              onChange={(e) => setNewAssetTicker(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAsset}
              style={{ marginBottom: '16px' }}
            >
              Add Asset
            </Button>

            <Typography variant="h6" gutterBottom>
              Assets
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Ticker</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset._id}>
                    <TableCell>{asset.name || 'Unknown Name'}</TableCell>
                    <TableCell>{asset.ticker || 'Unknown Ticker'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(asset._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Assets;
