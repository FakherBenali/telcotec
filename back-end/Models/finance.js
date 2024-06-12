const mongoose = require('mongoose');

const Finance = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    amount: Number,
    status:{ type: String, enum: ['paid', 'unpaid'] }, // e.g., paid, unpaid
    date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Finance', Finance);
