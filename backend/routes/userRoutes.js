const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   POST /api/users/register
// @desc    Register a user
router.post('/register', UserController.register);

// @route   POST /api/users/login
// @desc    Login a user
router.post('/login', UserController.login);

// @route   POST /api/users/profile
// @desc    Get the current user profile
router.get('/profile', authMiddleware, UserController.profile);

// @route   POST /api/users/all
// @desc    Get info of all users
// @only admin
router.get('/all', authMiddleware, adminMiddleware, UserController.getAllUsers);
module.exports = router;