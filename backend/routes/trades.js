const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// Get all trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new trade
router.post('/', async (req, res) => {
  const trade = new Trade(req.body);

  try {
    const newTrade = await trade.save();
    res.status(201).json(newTrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a trade
router.delete('/:id', async (req, res) => {
  try {
    await Trade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trade deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
