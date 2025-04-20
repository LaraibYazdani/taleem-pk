const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['student', 'university', 'admin'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false // For university approval
    },
    // Student-specific fields
    matricMarks: Number,
    interMarks: Number,
    testScores: {
        sat: Number,
        ecat: Number,
        mdcat: Number
    },
    areaOfInterest: String,

    // University-specific fields
    programsOffered: [String],
    eligibilityCriteria: String,
    feeStructure: String,
    scholarships: String,
    accommodationOptions: String,
    applicationDeadlines: String,
    updates: [String],
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
