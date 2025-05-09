const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // load .env file

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://taleem-pk.vercel.app', // Production frontend
    'http://localhost:3000'         // Local development
  ],
  credentials: true,
}));
app.use(express.json());

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// University Routes
const universityRoutes = require('./routes/universityRoutes');
app.use('/api/university', universityRoutes);

// Student Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);

// Application Routes
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);


// Sample Route
app.get('/', (req, res) => {
  res.send('Taleem.pk Backend is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
