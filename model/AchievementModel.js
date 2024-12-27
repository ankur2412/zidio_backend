const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  image: { type: String },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
