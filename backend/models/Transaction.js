const mongoose = require('mongoose');

// Schema for an individual order within a transaction
const orderInTransactionSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
});

// Schema for a transaction
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderIds: [orderInTransactionSchema], // Array of orders associated with this transaction
    status: {
        type: String,
        enum: ['failed', 'success', 'pending'],
        default: 'pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
