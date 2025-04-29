const jwt = require('jsonwebtoken');
const User = require('../models/User');
const University = require('../models/University');

// Enhanced Auth middleware for Express
const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Try to get token from cookie if not in header
  let jwtToken = token;
  if (!jwtToken && req.cookies && req.cookies.token) {
    jwtToken = req.cookies.token;
  }

  if (!jwtToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    let user;
    if (decoded.role === 'university') {
      user = await University.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = {
      ...user.toObject(),
      id: decoded.id,
      role: decoded.role
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
