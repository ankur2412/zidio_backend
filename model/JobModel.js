const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Internship'], required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  location: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
