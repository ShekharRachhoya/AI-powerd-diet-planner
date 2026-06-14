// Progress Model
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  calories: { type: Number },
  // Add more fields as needed
});

module.exports = mongoose.model('Progress', ProgressSchema);
