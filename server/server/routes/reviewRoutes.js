const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/', reviewsController.createReview);

router.get('/property/:propertyId', reviewsController.getReviewsForProperty);

router.get('/:reviewId', reviewsController.getReview);

router.put('/:reviewId', reviewsController.updateReview);

router.delete('/:reviewId', reviewsController.deleteReview);

module.exports = router;
