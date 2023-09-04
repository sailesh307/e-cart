const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const authMiddleware = require('../middleware/authMiddleware');

// Create or update shopping cart of current user
router.put('/', authMiddleware, CartController.createOrUpdateShoppingCart);

// Get shopping cart of current user 
router.get('/', authMiddleware, CartController.getShoppingCart);

module.exports = router;