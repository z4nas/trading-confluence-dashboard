const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
module.exports = mongoose.model('Asset', assetSchema);
