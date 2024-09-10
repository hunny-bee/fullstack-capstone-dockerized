const User = require('../models/User');
const jwt = require('jsonwebtoken');


// In your user controller
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
      // Check if the user is trying to create an admin
      if (role === 'admin') {
        // Ensure the user is an existing admin
        const existingAdmin = req.user; // req.user should be set by authMiddleware
        if (!existingAdmin || existingAdmin.role !== 'admin') {
          return res.status(403).json({ message: 'Only admins can create new admins' });
        }
      }
      
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });
  
      const user = new User({ name, email, password, role });
      await user.save();
  
      const token = user.generateAuthToken();
      res.cookie('token', token, { httpOnly: true });
      res.status(201).json({ message: 'User registered successfully', user: { name, email, role } });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = user.generateAuthToken();

  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({ message: 'Logged in successfully', user: { name: user.name, email: user.email, role: user.role } });
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
