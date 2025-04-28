const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, required: true },
  city: { type: String, required: true },
  highestQualification: { type: String, enum: ['HSSC', 'A-Levels', "Bachelor's"], required: true },
  finalPercentageOrCGPA: { type: Number, required: true },
  fieldOfInterest: { type: String, required: true },
  profilePicUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
