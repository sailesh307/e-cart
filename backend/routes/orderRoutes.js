const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a single order by ID
router.get('/:orderId', orderController.getOrderById);

// Update an order by ID
router.put('/:orderId', orderController.updateOrderById);

// Delete an order by ID
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router;
