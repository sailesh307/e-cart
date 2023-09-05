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
    available : {
        type: Boolean,
        default: true,
    },
    imageUrls: [String], // Array of image URLs
    seller: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Product', productSchema);
