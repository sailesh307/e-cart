const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Payment = require('../models/Payment');

// Create a new order
exports.createOrder = async (req, res) => {
    let newOrder;
    try {
        const userId = req.user.userId; // from authMiddleware
        const { shippingAddressId, orderItems } = req.body;
        const { paymentMethod, paymentDetails } = req.body;

        // calculate total amount
        let totalAmount = 0;
        orderItems.forEach((item) => {
            totalAmount += item.price * item.quantity;
        });
        
        // create order
        const order = new Order({
            userId,
            shippingAddressId,
            totalAmount,
        });
        newOrder = await order.save();

        // create order details
        orderItems.forEach(async (item) => {
            const orderDetail = new OrderDetail({
                orderId: newOrder._id,
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price,
            });
            await orderDetail.save();
        });

        // create payment
        const payment = new Payment({
            orderId: newOrder._id,
            paymentMethod,
            paymentDetails,
            paymentAmount: totalAmount,
        });
        await payment.save();
        
        res.json(newOrder);
    } catch (error) {
        console.log(error);
        // delete order if payment fails
        if (newOrder) {
            await Order.findByIdAndRemove(newOrder._id);
            await OrderDetail.deleteMany({ orderId: newOrder._id });
            await Payment.deleteOne({ orderId: newOrder._id });
        }
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Get all orders of current user on basis of query if any
exports.getAllOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // from authMiddleware
        const query = req.query;

        // if query is empty, fetch all orders
        if (Object.keys(query).length === 0) {
            const orders = await Order.find({ userId });
            res.json(orders);
        }
        // else fetch orders on basis of query
        else {
            const orders = await Order.find({ userId }).sort(query);
            res.json(orders);
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

// mark an order as delivered
exports.markOrderAsDeliveredAndPaid = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { deliveryStatus: 'delivered', paymentStatus: 'paid' }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// mark an order as cancelled
exports.markOrderAsCancelled = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, { deliveryStatus: 'cancelled' }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update order' });
    }
};

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndRemove(req.params.orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
