const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const hostAuthorization = require('../middleware/authMiddleware');


router.post('/:propertyId', hostAuthorization, activityController.addActivity);
router.delete('/:id', hostAuthorization, activityController.deleteActivity);
router.get('/:propertyId', activityController.getActivitiesByPropertyId);

module.exports = router;
