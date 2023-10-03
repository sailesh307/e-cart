const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // order id is not required because it is automatically generated
    // by MongoDB when we insert a new document
    // _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending',
    },
    shippingAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);
