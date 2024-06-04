const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(403).json({ msg: 'No user found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ msg: 'Token is not valid' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'You do not have admin privileges' });
  }
  next();
};


module.exports = {
  authenticationMiddleware,
  verifyAdmin,
};
