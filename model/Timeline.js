const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default:Date.now() },
});

module.exports = mongoose.model('Timeline', timelineSchema);
