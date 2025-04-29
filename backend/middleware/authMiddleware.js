const authenticate = require('./auth');

// Role-based middleware
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  };
}

module.exports = {
  authenticateJWT: authenticate,
  requireRole,
};
