const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    // orderDetail id is not required because it is automatically generated
    // by MongoDB when we insert a new document
    // _id: mongoose.Schema.Types.ObjectId,
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product.variant',
        // required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    // at the time of purchase
    price: {
        type: Number,
        default: 0,
        required: true,
    },
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);