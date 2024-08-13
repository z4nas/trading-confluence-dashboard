const express = require('express');
const router = express.Router();
const Indicator = require('../models/Indicator');

// Get all indicators
router.get('/', async (req, res) => {
  try {
    const indicators = await Indicator.find();
    res.json(indicators);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new indicator
router.post('/', async (req, res) => {
  const indicator = new Indicator(req.body);

  try {
    const newIndicator = await indicator.save();
    res.status(201).json(newIndicator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an indicator
router.delete('/:id', async (req, res) => {
  try {
    await Indicator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Indicator deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
