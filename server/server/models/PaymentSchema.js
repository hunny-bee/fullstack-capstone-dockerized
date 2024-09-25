const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'crypto'],
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'failed'],
      default: 'completed',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', PaymentSchema);