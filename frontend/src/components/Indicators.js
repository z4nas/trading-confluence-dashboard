
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function Indicators() {
    const [indicators, setIndicators] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingIndicator, setEditingIndicator] = useState({ name: '', description: '' });

    const fetchIndicators = useCallback(async () => {
        try {
            const response = await axios.get('/api/indicators');
            setIndicators(response.data);
        } catch (error) {
            console.error('Error fetching indicators:', error);
        }
    }, []);

    useEffect(() => {
        fetchIndicators();
    }, [fetchIndicators]);

    const handleAddIndicator = useCallback(async () => {
        try {
            const response = await axios.post('/api/indicators', { name, description });
            setIndicators([...indicators, response.data]);
            setName('');
            setDescription('');
        } catch (error) {
            console.error('Error adding indicator:', error);
        }
    }, [name, description, indicators]);

    const handleDeleteIndicator = async (id) => {
        try {
            await axios.delete(`/api/indicators/${id}`);
            setIndicators(indicators.filter(indicator => indicator._id !== id));
        } catch (error) {
            console.error('Error deleting indicator:', error);
        }
    };

    const startEdit = (indicator) => {
        setEditingId(indicator._id);
        setEditingIndicator({ name: indicator.name, description: indicator.description });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingIndicator({ name: '', description: '' });
    };

    const handleUpdateIndicator = async () => {
        try {
            const response = await axios.put(`/api/indicators/${editingId}`, editingIndicator);
            setIndicators(indicators.map((indicator) => (indicator._id === editingId ? response.data : indicator)));
            cancelEdit();
        } catch (error) {
            console.error('Error updating indicator:', error);
        }
    };

    return (
        <div>
            <h2>Indicators</h2>
            <form>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleAddIndicator}>
                    Add Indicator
                </Button>
            </form>
            <List>
                {indicators.map(indicator => (
                    <ListItem key={indicator._id}>
                        {editingId === indicator._id ? (
                            <>
                                <TextField
                                    value={editingIndicator.name}
                                    onChange={e => setEditingIndicator({ ...editingIndicator, name: e.target.value })}
                                    margin="dense"
                                />
                                <TextField
                                    value={editingIndicator.description}
                                    onChange={e => setEditingIndicator({ ...editingIndicator, description: e.target.value })}
                                    margin="dense"
                                />
                                <IconButton edge="end" onClick={handleUpdateIndicator}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={cancelEdit}>
                                    <CancelIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <ListItemText
                                    primary={indicator.name}
                                    secondary={indicator.description}
                                />
                                <IconButton edge="end" onClick={() => startEdit(indicator)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDeleteIndicator(indicator._id)}>
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

export default Indicators;
