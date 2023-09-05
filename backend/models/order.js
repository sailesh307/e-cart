const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product_id: {
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
    delivery_status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending',
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    delivered_date: {
        type: Date,
    },
    cancelled_date: {
        type: Date,
    },
});

module.exports = mongoose.model('Order', orderSchema);
