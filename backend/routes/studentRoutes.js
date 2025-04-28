const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');

const authenticate = require('../middleware/auth');

// Only allow students
const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') return next();
  return res.status(401).json({ message: 'Unauthorized' });
};

// Get current student's profile
router.get('/profile', authenticate, isStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Profile not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create or update student profile
router.post('/profile', authenticate, isStudent, async (req, res) => {
  try {
    const { fullName, city, highestQualification, finalPercentageOrCGPA, fieldOfInterest, profilePicUrl } = req.body;
    let student = await Student.findOne({ userId: req.user._id });
    if (student) {
      // Update existing profile
      student.fullName = fullName;
      student.city = city;
      student.highestQualification = highestQualification;
      student.finalPercentageOrCGPA = finalPercentageOrCGPA;
      student.fieldOfInterest = fieldOfInterest;
      if (profilePicUrl) student.profilePicUrl = profilePicUrl;
      await student.save();
    } else {
      // Create new profile
      student = new Student({
        userId: req.user._id,
        fullName,
        city,
        highestQualification,
        finalPercentageOrCGPA,
        fieldOfInterest,
        profilePicUrl
      });
      await student.save();
    }
    res.json({ message: 'Profile saved', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Endpoint for Taleem Connect (matching engine)
router.get('/matches', authenticate, isStudent, async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Profile not found' });

    // Fetch all approved universities
    const University = require('../models/University');
    const universities = await University.find({ approved: true });
    const matches = [];

    universities.forEach(university => {
      if (!university.programs || university.programs.length === 0) return;
      university.programs.forEach(program => {
        // Eligibility check
        if (student.finalPercentageOrCGPA < program.eligibilityPercentage) return;
        // City match
        const cityMatch = university.city && university.city.toLowerCase() === student.city.toLowerCase();
        // Field of interest partial match (case-insensitive substring)
        const interest = student.fieldOfInterest.trim().toLowerCase();
        const programName = program.name.trim().toLowerCase();
        const programMatch = programName.includes(interest) || interest.includes(programName);

        // Scoring: city match = +2, field match = +1, eligibility = must pass
        let score = 0;
        if (cityMatch) score += 2;
        if (programMatch) score += 1;
        // Only include if at least one match
        if (score > 0) {
          matches.push({
            universityId: university._id,
            universityName: university.name,
            universityCity: university.city,
            programName: program.name,
            programId: program._id,
            eligibility: program.eligibilityPercentage,
            matchScore: score,
            logoUrl: university.logoUrl || '',
            websiteUrl: university.websiteUrl || '',
          });
        }
      });
    });
    // Sort by score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Apply to a university program
router.post('/apply', authenticate, isStudent, async (req, res) => {
  try {
    const { universityId, programId, programName } = req.body;
    const studentId = req.user._id;
    if (!universityId || !programId || !programName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Find university
    const University = require('../models/University');
    const university = await University.findById(universityId);
    if (!university) return res.status(404).json({ message: 'University not found' });
    // Check if already applied
    if (!university.applications) university.applications = [];
    const alreadyApplied = university.applications.some(app => app.studentId.toString() === studentId.toString() && app.programName === programName);
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this program at this university.' });
    }
    // Add application
    university.applications.push({ studentId, programName, status: 'Pending' });
    await university.save();
    res.json({ message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
