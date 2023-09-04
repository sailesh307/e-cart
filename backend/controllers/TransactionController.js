const Transaction = require('../models/Transaction'); // Import your Transaction model

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { user, order, status, amount } = req.body;
        const transaction = new Transaction({ user, order, status, amount });
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

// Get a single transaction by ID
exports.getSingleTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

// Get transation by username
exports.getTransactionByUsername = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.params.username });
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};