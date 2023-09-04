const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
});

const shoppingCartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    items: [cartItemSchema],
});

shoppingCartSchema.virtual('userRef', {
    ref: 'User', // reference to 'User' model
    localField: 'user', // // Local field to match against 'User' model's field
    foreignField: 'username', // Field in the 'User' model to match against
    justOne: true, // Only return one user
})

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
