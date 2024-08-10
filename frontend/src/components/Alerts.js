
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [asset, setAsset] = useState('');
    const [condition, setCondition] = useState('');
    const [targetPrice, setTargetPrice] = useState('');

    const fetchAlerts = useCallback(async () => {
        try {
            const response = await axios.get('/api/alerts');
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    }, []);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    const handleAddAlert = useCallback(async () => {
        try {
            const response = await axios.post('/api/alerts', { asset, condition, targetPrice });
            setAlerts([...alerts, response.data]);
            setAsset('');
            setCondition('');
            setTargetPrice('');
        } catch (error) {
            console.error('Error adding alert:', error);
        }
    }, [asset, condition, targetPrice, alerts]);

    const handleDeleteAlert = async (id) => {
        try {
            await axios.delete(`/api/alerts/${id}`);
            setAlerts(alerts.filter(alert => alert._id !== id));
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    return (
        <div>
            <h2>Alerts</h2>
            <form>
                <TextField
                    label="Asset"
                    value={asset}
                    onChange={e => setAsset(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Condition"
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Target Price"
                    value={targetPrice}
                    onChange={e => setTargetPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleAddAlert}>
                    Add Alert
                </Button>
            </form>
            <List>
                {alerts.map(alert => (
                    <ListItem key={alert._id}>
                        <ListItemText
                            primary={`${alert.asset} - ${alert.condition} - ${alert.targetPrice}`}
                        />
                        <IconButton edge="end" onClick={() => handleDeleteAlert(alert._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Alerts;
