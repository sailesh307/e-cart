const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const user_id = req.user.userId; // from authMiddleware
        const { product_id, quantity, total } = req.body;
        // check for payment status
        const order = new Order({ user_id, product_id, quantity, total });
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
        const user_id = req.user.userId; // from authMiddleware
        let query = {};

        // check on basis of delivery status
        if (req.query.delivery_status) {
            query.delivery_status = req.query.delivery_status;
        }
        // check on basis of payment status
        if (req.query.payment_status) {
            query.payment_status = req.query.payment_status;
        }
        // check on order date range
        if (req.query.startDate && req.query.endDate) {
            query.order_date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate),
            };
        }

        // query orders collection with query and user_id and populate product_id with name and price
        const orders = await Order.find(query).where({ user_id }).populate('product_id', 'name price');
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
        const order = await Order.findByIdAndUpdate(req.params.orderId, { delivery_status: 'delivered', payment_status: 'paid' }, { new: true });
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
        const order = await Order.findByIdAndUpdate(req.params.orderId, { delivery_status: 'cancelled' }, { new: true });
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
