const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    price: {
        type: {
            mrp: Number,
            selling: Number,
        }
    },
    stock: {
        type: Number,
        default: 0,
    },
    images: [String],
});

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    keywords: [],
    category: {
        type: String,
        required: true,
    },
    subCategory: String,
    name: {
        type: String,
        required: true,
    },
    brand: String,
    price: {
        type: {
            mrp: Number,
            selling: Number,
        }
    },
    stock: {
        type: Number,
        default: 0,
    },
    highlights: {
        type: [String],
        default: null,
    },
    about: {
        type: [String],
        default: null,
    },
    shippingFee: {
        type: Number,
        default: 0,
    },
    images: [String],
    variant: {
        type: [variantSchema],
        default: null,
    },
    rating: {
        type: Number,
        // assign random rating between 2.5 and 5
        default: Math.floor(Math.random() * 25) / 10 + 2.5,
    },
    ratingCount: {
        type: Number,
        // assign random rating count between 500 and 2000000
        default: Math.floor(Math.random() * 2000000) + 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

// Mongoose middleware to update the 'updatedAt' field before updating the document
productSchema.pre('findOneAndUpdate', function () {
    this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
});


module.exports = mongoose.model('Product', productSchema);