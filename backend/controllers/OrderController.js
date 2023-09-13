const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.userId; // from authMiddleware
        const { productId, quantity, total } = req.body;
        // check for payment status
        const order = new Order({ userId, productId, quantity, total });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Get all orders of current user on basis of query
exports.getAllOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // from authMiddleware
        let query = {};

        // check on basis of delivery status
        if (req.query.deliveryStatus) {
            query.deliveryStatus = req.query.deliveryStatus;
        }
        // check on basis of payment status
        if (req.query.paymentStatus) {
            query.paymentStatus = req.query.paymentStatus;
        }
        // check on order date range
        if (req.query.startDate && req.query.endDate) {
            query.orderDate = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate),
            };
        }

        // query orders collection with query and userId and populate productId with name and price
        const orders = await Order.find(query).where({ userId }).populate('productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

// mark an order as delivered
exports.markOrderAsDeliveredAndPaid = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { deliveryStatus: 'delivered', paymentStatus: 'paid' }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// mark an order as cancelled
exports.markOrderAsCancelled = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { deliveryStatus: 'cancelled' }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndRemove(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
