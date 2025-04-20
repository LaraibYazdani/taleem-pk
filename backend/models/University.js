const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  approved: { type: Boolean, default: false }, // Admin will approve
});

module.exports = mongoose.model('University', universitySchema);
