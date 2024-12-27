const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  expertise: [String],
  videoUrl: { type: String },
  image: { type: String },
});

module.exports = mongoose.model('Team', teamSchema);
