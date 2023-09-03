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

// Add more routes for user-related operations (e.g., update profile, change password, etc.)

module.exports = router;
