const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  universityName: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Ongoing', 'Accepted', 'Rejected'], default: 'Ongoing' }
});

module.exports = mongoose.model('Application', applicationSchema);
