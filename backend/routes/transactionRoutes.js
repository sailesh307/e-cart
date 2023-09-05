const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');

const authMiddleware = require('../middleware/authMiddleware');
const paymentVerificationMiddleware = require('../middleware/paymentVerificationMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const customerMiddleware = require('../middleware/customerMiddleware');

///////////////////// Customer /////////////////////
// Create a new transaction of current user
router.post('/', authMiddleware, customerMiddleware, paymentVerificationMiddleware, TransactionController.createTransactionOfCurrentUser);
// Get all transactions of current user
router.get('/', authMiddleware, customerMiddleware, TransactionController.getAllTransactionsOfCurrentUser);
// Get a single transaction full detail by transaction ID of current user
router.get('/id/:transactionId', authMiddleware, customerMiddleware, TransactionController.getSingleTransactionFullDetailsOfCurrentUser);


///////////////////// Admin /////////////////////
// Get all transactions full details
router.get('/all', authMiddleware, adminMiddleware, TransactionController.getAllTransactionsFullDetails);
module.exports = router;