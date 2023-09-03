const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    imageUrls: [String], // Array of image URLs
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            value: {
                type: Number,
                min: 1,
                max: 5,
                default: 4,
            },
            review: String, // Review text
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },    
  // Additional fields as needed.
});

module.exports = mongoose.model('Product', productSchema);
