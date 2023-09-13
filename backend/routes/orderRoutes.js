const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new order for current user
router.post('/', authMiddleware ,orderController.createOrder);

// Get all orders of current user
router.get('/', authMiddleware, orderController.getAllOrders);

// mark an order as delivered by admin only
router.put('/:orderId/delivered', authMiddleware, orderController.markOrderAsDeliveredAndPaid);

// mark an order as cancelled 
router.put('/:orderId/cancelled', authMiddleware, orderController.markOrderAsCancelled);

// Delete an order by ID
router.delete('/:orderId', orderController.deleteOrderById);

module.exports = router;
