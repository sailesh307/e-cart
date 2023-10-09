const mongoose = require('mongoose');
// const { id, name, price, color, quantity, imageSrc, imageAlt, variantId } = item;
// const productId = id;
const cartItemSchema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});

cartSchema.pre('findOneAndUpdate', function (next) {
    this.modifiedAt = Date.now();
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
