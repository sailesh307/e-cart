const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkCart } = require('../middleware/cartMiddleware');

// @route   POST /api/cart
// @desc    Create or update shopping cart
router.post('/', authMiddleware, checkCart, CartController.addItemToCart);

// @route   GET /api/cart
// @desc    Get shopping cart
router.get('/', authMiddleware, checkCart, CartController.getShoppingCart);

// @route   DELETE /api/cart/:id
// @desc    Delete item from cart
router.delete('/:id', authMiddleware, checkCart, CartController.removeItemFromCart);

// @route   UPDATE /api/cart/:id
// @desc    Update item quantity in cart
router.put('/:id', authMiddleware, checkCart, CartController.updateItemQuantity);

module.exports = router;