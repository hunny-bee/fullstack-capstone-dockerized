const jwt = require('jsonwebtoken');

exports.isAdmin = async(req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'host') {
      return res.status(403).json({ message: 'This action requires admin privileges.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: No valid token.' });
  }
};

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User not found' });
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
  
  exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    next();
  };
  

  exports.selfOrAdminMiddleware = (req, res, next) => {
    const isSelf = req.user._id.toString() === req.params.id;
    if (isSelf || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };


