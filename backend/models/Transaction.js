const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: String,
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
    },
    amount: {
        type: Number,
        required: true,
    },

    // Additional fields such as shipping information, etc.
});

// Virtual field to reference the 'User' model
transactionSchema.virtual('userRef', {
    ref: 'User', // reference to 'User' model
    localField: 'user', // // Local field to match against 'User' model's field
    foreignField: 'username', // Field in the 'User' model to match against
    justOne: true, // Only return one user
});

module.exports = mongoose.model('Transaction', transactionSchema);
