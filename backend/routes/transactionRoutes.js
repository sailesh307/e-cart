const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Get a single transaction by ID
router.get('/:transactionId', transactionController.getSingleTransaction);

// Get transation by username
router.get('/user/:username', transactionController.getTransactionByUsername);
module.exports = router;