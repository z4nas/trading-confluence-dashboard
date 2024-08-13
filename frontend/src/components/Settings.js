import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Theme
            </Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleThemeChange} />}
              label="Dark Mode"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={<Switch checked={notificationsEnabled} onChange={handleNotificationsChange} />}
              label="Enable Notifications"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
