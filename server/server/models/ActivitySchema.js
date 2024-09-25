const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Activity', ActivitySchema);