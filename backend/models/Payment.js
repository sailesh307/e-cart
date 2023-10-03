const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // paymentment id is not required because it is automatically generated
    // by MongoDB when we insert a new document
    // _id: mongoose.Schema.Types.ObjectId,
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    paymentDate: {
        type: Date,
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'card', 'paypal', 'stripe', 'razorpay', 'paytm'],
        default: 'cod',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    paymentAmount: {
        type: Number,
        default: 0,
        required: true,
    },
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },    
});

module.exports = mongoose.model('Payment', paymentSchema);
