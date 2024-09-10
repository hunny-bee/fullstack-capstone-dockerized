const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { isAdmin } = require('../middleware/authMiddleware');  

const router = express.Router();


router.post('/signup', signup);  
router.post('/login', login);    


router.post('/logout', logout);

router.post('/admin/signup', isAdmin, signup);  
router.post('/admin/login', isAdmin, login);   

module.exports = router;
