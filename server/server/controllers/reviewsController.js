const Review = require('../models/ReviewSchema');
const Booking = require('../models/BookingSchema');

exports.addReview = async (req, res) => {
  try {
    const { property, rating, comment } = req.body;

    const hasBooked = await Booking.findOne({ property, guest: req.user.userId });
    if (!hasBooked) {
      return res.status(400).json({ message: 'You must book this property to leave a review' });
    }

    const review = new Review({
      property,
      guest: req.user.userId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getReviewsForProperty = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.id }).populate('guest', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updates = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
