const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const University = require('../models/University');
const Student = require('../models/Student');

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'taleem-pk/universities',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

// ===============================
// University Registration
// ===============================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, description, city, websiteUrl, contactNumber } = req.body;

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
      city,
      websiteUrl,
      contactNumber
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

// ===============================
// Admin - Block University (set approved=false, blocked=true)
// ===============================
router.put('/block/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { approved: false, blocked: true },
      { new: true }
    );
    res.status(200).json({ message: 'University blocked.', university });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// University - Update Profile (Banner, Gallery, Text Fields)
// ===============================
router.put('/profile/update/:id', upload.fields([
  { name: 'bannerImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files['bannerImage'] && req.files['bannerImage'][0]) {
      updateData.bannerImage = req.files['bannerImage'][0].path;
    }

    if (req.files['galleryImages']) {
      updateData.gallery = req.files['galleryImages'].map(file => file.path);
    }

    if (updateData.programs) {
      updateData.programs = JSON.parse(updateData.programs);
    }
    if (updateData.newsUpdates) {
      updateData.newsUpdates = JSON.parse(updateData.newsUpdates);
    }

    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json(updatedUniversity);
  } catch (error) {
    console.error('Error updating university profile:', error);
    res.status(500).json({ message: "Failed to update university profile." });
  }
});


// ===============================
// University - Upload Banner Separately
// ===============================
router.post('/upload/banner', upload.single('bannerImage'), (req, res) => {
  try {
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    console.error('Error uploading banner:', error);
    res.status(500).json({ message: 'Banner upload failed' });
  }
});

// ===============================
// University - Upload Gallery Separately
// ===============================
router.post('/upload/gallery', upload.array('galleryImages', 10), (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path);
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Error uploading gallery images:', error);
    res.status(500).json({ message: 'Gallery upload failed' });
  }
});

// ===============================
// University - Add Program
// ===============================
router.post('/programs/add/:universityId', async (req, res) => {
  try {
    const university = await University.findById(req.params.universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    university.programs.push(req.body);
    await university.save();

    res.status(200).json({ message: "Program added successfully" });
  } catch (error) {
    console.error("Error adding program:", error);
    res.status(500).json({ message: "Failed to add program" });
  }
});

// ===============================
// University - Edit Program
// ===============================
router.put('/programs/edit/:universityId/:programId', async (req, res) => {
  try {
    const university = await University.findById(req.params.universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    const program = university.programs.id(req.params.programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    program.set(req.body);
    await university.save();

    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error("Error editing program:", error);
    res.status(500).json({ message: "Failed to edit program" });
  }
});

// ===============================
// University - Delete Program
// ===============================
router.delete('/programs/delete/:universityId/:programId', async (req, res) => {
  try {
    const university = await University.findById(req.params.universityId);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    university.programs = university.programs.filter(
      (program) => program._id.toString() !== req.params.programId
    );

    await university.save();

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json({ message: "Failed to delete program" });
  }
});

// ===============================
// University - Get University Profile
// ===============================
router.get('/profile/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (error) {
    console.error('Error fetching university profile:', error);
    res.status(500).json({ message: "Failed to fetch university profile." });
  }
});

// University - Get Applications Inbox
router.get('/applications/:universityId', async (req, res) => {
  try {
    const university = await University.findById(req.params.universityId).lean();
    if (!university) return res.status(404).json({ message: 'University not found' });
    if (!university.applications || university.applications.length === 0) {
      return res.json([]);
    }
    // Get student details for each application
    const studentIds = university.applications.map(app => app.studentId);
    const students = await Student.find({ userId: { $in: studentIds } }).lean();
    const studentsById = Object.fromEntries(students.map(s => [s.userId.toString(), s]));
    const inbox = university.applications.map(app => ({
      studentId: app.studentId,
      studentName: studentsById[app.studentId.toString()]?.fullName || 'N/A',
      programName: app.programName,
      status: app.status
    }));
    res.json(inbox);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
