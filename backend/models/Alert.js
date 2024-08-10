
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    asset: { type: String, required: true },
    condition: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
