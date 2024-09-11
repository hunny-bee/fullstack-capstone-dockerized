const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');  

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email address'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minlength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
      },
      message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number',
    },
  },
  role: {
    type: String,
    enum: ['host', 'guest'],
    default: 'guest',
  },
  googleId: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: 'default-profile-pic.jpg', 
  },
  profileImage: {
    type: String,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    throw new Error('Password not set for this user, likely an OAuth user');
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);
