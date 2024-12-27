const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  project: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);
