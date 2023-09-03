const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

// Create a new shopping cart
router.post('/', cartController.createShoppingCart);

// Get all shopping carts
router.get('/', cartController.getAllShoppingCarts);

// Get a single shopping cart by ID
router.get('/:shoppingCartId', cartController.getShoppingCartById);

// Update a shopping cart by ID
router.put('/:shoppingCartId', cartController.updateShoppingCartById);

// Delete a shopping cart by ID
router.delete('/:shoppingCartId', cartController.deleteShoppingCartById);

module.exports = router;
