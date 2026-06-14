// DietPlan Model
const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: { type: Array, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model('DietPlan', DietPlanSchema);
