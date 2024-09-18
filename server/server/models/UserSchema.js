const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['guest', 'host'],
    required: true,
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  listings: [{
    type: Schema.Types.ObjectId,
    ref: 'Property',
  }],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
