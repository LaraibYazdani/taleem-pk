const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  eligibilityPercentage: { type: Number, required: true },
  eligibilityCertificate: { type: String, required: true },
  additionalNotes: { type: String }
});

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now }
});

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  programName: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
}, { _id: false });

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  approved: { type: Boolean, default: false },
  description: { type: String },
  city: { type: String },
  logoUrl: { type: String },
  websiteUrl: { type: String },
  bannerImage: { type: String }, // Cloudinary URL for banner image
  programs: [programSchema],
  scholarshipsInfo: { type: String },
  hostelInfo: { type: String },
  feeStructure: { type: String },
  admissionLink: { type: String },
  gallery: [{ type: String }], // Array of image URLs
  newsUpdates: [newsSchema],
  applications: [applicationSchema]
}, { timestamps: true });

const University = mongoose.model('University', universitySchema);

module.exports = University;
