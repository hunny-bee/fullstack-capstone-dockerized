const Payment = require('../models/payment'); 
const Booking = require('../models/booking');

/// Process a payment
exports.processPayment = async (req, res) => {
  try {
    const { booking, amount, paymentMethod } = req.body;
    const payment = new Payment({
      booking,
      amount,
      paymentMethod,
      status: 'Completed', 
    });

    await payment.save();
    await Booking.findByIdAndUpdate(booking, { status: 'Paid' });

    res.status(201).json({ message: 'Payment processed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get payment details by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('booking');
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};