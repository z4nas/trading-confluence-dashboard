const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  marketDirection: { type: String, required: true },
  asset: { type: String, required: true },
  indicators: { type: [String], required: true },
  entryPrice: { type: Number, required: true },
  profitExit: { type: Number, required: true },
  stopLoss: { type: Number, required: true },
  investmentAmount: { type: Number, required: true },
  loggedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', tradeSchema);
