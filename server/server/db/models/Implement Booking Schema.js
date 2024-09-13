const BookingSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);