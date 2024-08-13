const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new asset
router.post('/', async (req, res) => {
  const asset = new Asset(req.body);

  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an asset
router.delete('/:id', async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
