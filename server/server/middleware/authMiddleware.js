const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

exports.authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

exports.hostOnly = (req, res, next) => {
  if (req.user && req.user.role === "host") {
    return next();
  }
  
  return res.status(403).json({ message: "Access denied. Only hosts can perform this action." });
};
