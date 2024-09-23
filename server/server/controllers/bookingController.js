const Booking = require('../models/BookingSchema');
const Property = require('../models/PropertySchema');


exports.createBooking = async (req, res) => {
  try {
    const { property, checkInDate, checkOutDate } = req.body;
    const propertyDetails = await Property.findById(property);

    const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = propertyDetails.pricePerNight * days;

    const booking = new Booking({
      property,
      guest: req.user.userId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property guest', 'title name');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.userId }).populate('property', 'title');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
