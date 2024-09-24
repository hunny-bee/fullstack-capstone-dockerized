const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking); 
router.get('/:id', bookingController.getBookingById); 
router.put('/:id', bookingController.updateBooking); 
router.delete('/:id', bookingController.deleteBooking); 
router.get('/user/:userId', bookingController.getBookingsByUser); 
router.get('/property/:propertyId', bookingController.getBookingsByProperty); 

module.exports = router;
