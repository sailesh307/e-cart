const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    // Additional fields such as price, subtotal, etc.
});

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: function (items) {
                return items && items.length > 0;
            },
            message: 'Order must have at least one item',
        }
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending',
    },
    date: {
        type: Date,
        default: Date.now,
    }
    // Additional fields such as shipping information, status, etc.
});

orderSchema.virtual('userRef', {
    ref: 'User',
    localField: 'user',
    foreignField: 'username',
    justOne: true,
})

module.exports = mongoose.model('Order', orderSchema);
