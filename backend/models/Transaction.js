const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    status: {
        type: String,
        enum: ['failed', 'success', 'pending'],
        default: 'pending',
    },
    date: {
        type: Date,
        default: Date.now,
    }
    // Additional fields such as shipping information, etc.
});

// custom getter function for the 'total' field
transactionSchema.virtual('total').get(function () {
    if (this.order && this.order.total) {
        return this.order.total;
    } else {
        return 0; // Default to 0 if the order or total is not available
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
