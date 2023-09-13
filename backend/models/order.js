const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    total: {
        type: Number,
        required: true,
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveredDate: {
        type: Date,
    },
    cancelledDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Order', orderSchema);
