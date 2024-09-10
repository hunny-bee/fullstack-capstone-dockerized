const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function() {  
      return !this.googleId;
    }
  },
  role: { type: String, enum: ['host', 'guest'], default: 'guest' },
  googleId: { type: String },
  profileImage: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  if (!this.password) {
    throw new Error('Password not set for this user, likely an OAuth user');
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function() {
  
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'  
  });
  return token;
};

module.exports = mongoose.model('User', userSchema);
