const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);
router.get('/property/:propertyId', reviewController.getReviewsByProperty);
router.get('/user/:userId', reviewController.getReviewsByUser); 

module.exports = router;