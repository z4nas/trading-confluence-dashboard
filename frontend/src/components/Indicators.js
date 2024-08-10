
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Indicators() {
    const [indicators, setIndicators] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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
                        <ListItemText
                            primary={indicator.name}
                            secondary={indicator.description}
                        />
                        <IconButton edge="end" onClick={() => handleDeleteIndicator(indicator._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Indicators;
