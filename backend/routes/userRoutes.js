const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', UserController.register);

// Route for user login
router.post('/login', UserController.login);

// Protected route for user profile
router.get('/profile', authMiddleware, UserController.profile);

router.get('/all', UserController.getAllUsers);
module.exports = router;
