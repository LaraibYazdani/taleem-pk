const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const University = require('../models/University');

const router = express.Router();

// ===============================
// University Registration
// ===============================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, description } = req.body;

    const existingUniversity = await University.findOne({ email });
    if (existingUniversity) {
      return res.status(400).json({ message: 'University already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const university = new University({
      name,
      email,
      password: hashedPassword,
      description,
    });

    await university.save();
    res.status(201).json({ message: 'University registered successfully. Awaiting admin approval.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// University Login
// ===============================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const university = await University.findOne({ email });
    if (!university) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!university.approved) {
      return res.status(400).json({ message: 'University not approved yet by admin' });
    }

    const isMatch = await bcrypt.compare(password, university.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: university._id, role: 'university' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, university });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// Admin - Fetch All Pending Universities
// ===============================
router.get('/pending', async (req, res) => {
  try {
    const pendingUniversities = await University.find({ approved: false });
    res.status(200).json(pendingUniversities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// Admin - Fetch All Approved Universities
// ===============================
router.get('/approved', async (req, res) => {
  try {
    const approvedUniversities = await University.find({ approved: true });
    res.status(200).json(approvedUniversities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// Admin - Approve University
// ===============================
router.put('/approve/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// Admin - Reject University (Delete)
// ===============================
router.delete('/reject/:id', async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'University rejected and deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
