const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware, selfOrAdminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);  
router.get('/users/:id', authMiddleware, selfOrAdminMiddleware, getUserById); 
router.put('/users/:id', authMiddleware, selfOrAdminMiddleware, updateUser);  
router.delete('/users/:id', authMiddleware, selfOrAdminMiddleware, deleteUser); 

module.exports = router;