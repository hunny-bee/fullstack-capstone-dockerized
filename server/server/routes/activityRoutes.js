const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateUser, hostOnly } = require('../middleware/authMiddleware');

router.post('/',authenticateUser, hostOnly, activityController.createActivity);
router.get('/:id', activityController.getActivityById);
router.put('/:id',authenticateUser, hostOnly, activityController.updateActivity);
router.delete('/:id',authenticateUser, hostOnly, activityController.deleteActivity)
router.get('/', activityController.getAllActivities);

module.exports = router;