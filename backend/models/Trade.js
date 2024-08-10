const mongoose = require('mongoose');
const tradeSchema = new mongoose.Schema({
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});
module.exports = mongoose.model('Trade', tradeSchema);
