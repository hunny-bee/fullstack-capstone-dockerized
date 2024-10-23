const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authenticateUser, hostOnly } = require('../middleware/authMiddleware');


router.post('/', ...propertyController.createProperty); 
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', authenticateUser, hostOnly, propertyController.updateProperty);
router.delete('/:id',authenticateUser, hostOnly, propertyController.deleteProperty); 
router.get('/host/:hostId', propertyController.getPropertiesByHost); 

module.exports = router;
