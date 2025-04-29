const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Student = require('../models/Student');
const University = require('../models/University');
const { authenticateJWT, requireRole } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Student submits a new application
router.post('/', authenticateJWT, requireRole('student'), async (req, res) => {
  try {
    const { universityId, universityName } = req.body;
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = await Application.findOne({ studentId: student._id, universityId });
    if (existing) return res.status(409).json({ message: 'Already applied to this university' });
    const application = new Application({
      studentId: student._id,
      studentName: user.name,
      studentEmail: user.email,
      universityId,
      universityName,
      applicationDate: new Date(),
      status: 'Ongoing'
    });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Student fetches their applications
router.get('/student', authenticateJWT, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    const applications = await Application.find({ studentId: student._id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// University fetches all applications to them
router.get('/university', authenticateJWT, requireRole('university'), async (req, res) => {
  try {
    const university = await University.findById(req.user.id);
    if (!university) return res.status(404).json({ message: 'University not found' });
    const applications = await Application.find({ universityId: university._id });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// University updates application status
router.patch('/:id/status', authenticateJWT, requireRole('university'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Ongoing', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    // Only allow the university to update its own applications
    if (String(application.universityId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
