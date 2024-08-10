
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Trading Confluence Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/trades">Trades</Button>
        <Button color="inherit" component={Link} to="/add-trade">Add Trade</Button>
        <Button color="inherit" component={Link} to="/market-trend">Market Trend</Button>
        <Button color="inherit" component={Link} to="/notes">Notes</Button>
        <Button color="inherit" component={Link} to="/reports">Reports</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
