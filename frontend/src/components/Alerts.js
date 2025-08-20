
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [asset, setAsset] = useState('');
    const [condition, setCondition] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingAlert, setEditingAlert] = useState({ asset: '', condition: '', targetPrice: '' });

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

    const startEdit = (alert) => {
        setEditingId(alert._id);
        setEditingAlert({
            asset: alert.asset,
            condition: alert.condition,
            targetPrice: alert.targetPrice,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingAlert({ asset: '', condition: '', targetPrice: '' });
    };

    const handleUpdateAlert = async () => {
        try {
            const response = await axios.put(`/api/alerts/${editingId}`, editingAlert);
            setAlerts(alerts.map((alert) => (alert._id === editingId ? response.data : alert)));
            cancelEdit();
        } catch (error) {
            console.error('Error updating alert:', error);
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
                        {editingId === alert._id ? (
                            <>
                                <TextField
                                    value={editingAlert.asset}
                                    onChange={e => setEditingAlert({ ...editingAlert, asset: e.target.value })}
                                    margin="dense"
                                />
                                <TextField
                                    value={editingAlert.condition}
                                    onChange={e => setEditingAlert({ ...editingAlert, condition: e.target.value })}
                                    margin="dense"
                                />
                                <TextField
                                    value={editingAlert.targetPrice}
                                    onChange={e => setEditingAlert({ ...editingAlert, targetPrice: e.target.value })}
                                    margin="dense"
                                />
                                <IconButton edge="end" onClick={handleUpdateAlert}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={cancelEdit}>
                                    <CancelIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <ListItemText
                                    primary={`${alert.asset} - ${alert.condition} - ${alert.targetPrice}`}
                                />
                                <IconButton edge="end" onClick={() => startEdit(alert)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDeleteAlert(alert._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Alerts;
