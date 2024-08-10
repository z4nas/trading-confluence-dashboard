const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

router.get('/', async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

router.post('/', async (req, res) => {
  const asset = new Asset({ name: req.body.name });
  await asset.save();
  res.json(asset);
});

router.delete('/:id', async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ message: 'Asset deleted' });
});

module.exports = router;
