const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    imageUrls: [String], // Array of image URLs
    seller: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Additional fields as needed.
});

productSchema.virtual('categoryRef', {
    ref: 'Category', // reference to 'Category' model
    localField: 'category', // // Local field to match against 'Category' model's field
    foreignField: 'name', // Field in the 'Category' model to match against
    justOne: true, // Only return one category
});

productSchema.virtual('sellerRef', {
    ref: 'User', // reference to 'User' model
    localField: 'seller', // // Local field to match against 'User' model's field
    foreignField: 'username', // Field in the 'User' model to match against
    justOne: true, // Only return one user
});

module.exports = mongoose.model('Product', productSchema);
