const Transaction = require('../models/Transaction'); // Import your Transaction model
const Order = require('../models/Order'); // Import your Order model
// Create a new transaction
exports.createTransactionOfCurrentUser = async (req, res) => {
    try {
        const { user, paymentStatus } = req; // Get userId and paymentStatus from the request object (added by the middleware)
        const userId = user.userId;
        const { orderIds, amount } = req.body;
        const transaction = new Transaction({ userId, orderIds, amount });
        if (paymentStatus === 'success') {
            transaction.status = 'success';
        }
        else if (paymentStatus === 'failure') {
            transaction.status = 'failed';
        }
        // save transaction
        const savedTransaction = await transaction.save();


        // Now map over orderIds and update payment status in each order
        const orderIdsList = orderIds.map((order) => {
            return order.orderId;
        });

        // if payment is successful
        if (paymentStatus === 'success') {
            await Order.updateMany({ _id: { $in: orderIdsList } }, { paymentStatus: 'paid' });
        }

        // send response
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

// Get all transactions of current user
exports.getAllTransactionsOfCurrentUser = async (req, res) => {
    try {
        const { userId } = req.user; // Get userId from the request object (added by the middleware)

        // Find all transactions of the current user
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

// Get a single transaction full details by ID
exports.getSingleTransactionFullDetailsOfCurrentUser = async (req, res) => {
    try {
        const { userId } = req.user; // Get userId from the request object (added by the middleware)

        // find transaction by id and userId

        const transaction = await Transaction.findOne({ _id: req.params.transactionId, userId });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // populate transaction with order details
        await (await transaction.populate('orderIds.orderId')).populate('orderIds.orderId.productId');
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

// Get all transactions full details (only for admin)
exports.getAllTransactionsFullDetails = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        // Find all transactions
        const transactions = await Transaction.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ date: -1 }) // sort in descending transaction date
            .populate('userId', 'username email'); // populate userId with username and email
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};