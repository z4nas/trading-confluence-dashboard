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

const Indicators = () => {
  const [indicators, setIndicators] = useState([]);
  const [newIndicatorName, setNewIndicatorName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/indicators')
      .then(response => {
        setIndicators(response.data);
      })
      .catch(error => {
        console.error('Error fetching indicators:', error);
      });
  }, []);

  const handleAddIndicator = () => {
    if (newIndicatorName) {
      axios.post('http://localhost:5000/indicators', {
        name: newIndicatorName,
      })
        .then(response => {
          setIndicators([...indicators, response.data]);
          setNewIndicatorName('');
        })
        .catch(error => {
          console.error('Error adding indicator:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/indicators/${id}`)
      .then(() => {
        setIndicators(indicators.filter(indicator => indicator._id !== id));
      })
      .catch(error => {
        console.error('Error deleting indicator:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Indicator Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Add New Indicator
            </Typography>
            <TextField
              label="Indicator Name"
              value={newIndicatorName}
              onChange={(e) => setNewIndicatorName(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddIndicator}
              style={{ marginBottom: '16px' }}
            >
              Add Indicator
            </Button>

            <Typography variant="h6" gutterBottom>
              Indicators
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Indicator Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {indicators.map((indicator) => (
                  <TableRow key={indicator._id}>
                    <TableCell>{indicator.name || 'Unknown Name'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(indicator._id)} color="error">
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

export default Indicators;
