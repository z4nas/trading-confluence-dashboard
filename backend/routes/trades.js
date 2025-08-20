const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

router.get('/', async (req, res) => {
  const trades = await Trade.find().populate('asset');
  res.json(trades);
});

router.post('/', async (req, res) => {
  const trade = new Trade({
    asset: req.body.asset,
    price: req.body.price,
    quantity: req.body.quantity
  });
  await trade.save();
  res.json(trade);
});

router.put('/:id', async (req, res) => {
  const trade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate('asset');
  res.json(trade);
});

router.delete('/:id', async (req, res) => {
  await Trade.findByIdAndDelete(req.params.id);
  res.json({ message: 'Trade deleted' });
});

module.exports = router;
