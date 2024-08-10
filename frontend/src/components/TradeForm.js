import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

function TradeForm() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get('/api/assets');
                setAssets(response.data);
            } catch (error) {
                console.error('Error fetching assets:', error);
            }
        };
        fetchAssets();
    }, []);

    const handleAddTrade = async () => {
        try {
            const response = await axios.post('/api/trades', {
                asset: selectedAsset,
                price: parseFloat(price),
                quantity: parseInt(quantity),
            });
            console.log('Trade added:', response.data);
        } catch (error) {
            console.error('Error adding trade:', error);
        }
    };

    return (
        <div>
            <h2>Add Trade</h2>
            <FormControl fullWidth margin="normal">
                <InputLabel>Asset</InputLabel>
                <Select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
                    {assets.map((asset) => (
                        <MenuItem key={asset._id} value={asset._id}>
                            {asset.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddTrade}>
                Add Trade
            </Button>
        </div>
    );
}

export default TradeForm;