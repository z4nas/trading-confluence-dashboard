const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tradeRoutes = require('./routes/trades');
const assetRoutes = require('./routes/assets');
const indicatorRoutes = require('./routes/indicators');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/trades', tradeRoutes);
app.use('/assets', assetRoutes);
app.use('/indicators', indicatorRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/trading_dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.listen(5000, () => {
  console.log('Server Started on port 5000');
});
