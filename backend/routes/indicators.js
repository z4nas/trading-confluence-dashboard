
const express = require('express');
const router = express.Router();
const Indicator = require('../models/Indicator');

router.get('/', async (req, res) => {
    const indicators = await Indicator.find();
    res.json(indicators);
});

router.post('/', async (req, res) => {
    const indicator = new Indicator(req.body);
    await indicator.save();
    res.json(indicator);
});

router.delete('/:id', async (req, res) => {
    await Indicator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Indicator deleted' });
});

module.exports = router;
