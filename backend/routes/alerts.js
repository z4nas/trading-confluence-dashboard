
const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

router.get('/', async (req, res) => {
    const alerts = await Alert.find();
    res.json(alerts);
});

router.post('/', async (req, res) => {
    const alert = new Alert(req.body);
    await alert.save();
    res.json(alert);
});

router.put('/:id', async (req, res) => {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(alert);
});

router.delete('/:id', async (req, res) => {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alert deleted' });
});

module.exports = router;
