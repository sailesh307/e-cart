const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    price: Number,
    images: [String],
});

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: String,
        enum: ['phone', 'clothing', 'electronics'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    brand: String,
    details: [String],
    highlights: [String],
    commonImages: {
        type: [String],
        required: true,
        validate: {
            validator: (images) => images.length > 0,
            message: 'Product must have at least one common image',
        }
    },
    variant: {
        type: {
            allColors: [String],
            allSizes: [String],
            variantData: {
                type: [variantSchema],
                required: true,
                validate: {
                    validator: (variants) => variants.length > 0,

                    message: 'Product must have at least one variant',
                }
            },
        },
        required: true,
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


// sample data
/* 
const data = {
    sellerId: ObjectId,
    category: String,
    name: String,
    description: String,
    brand: String,
    details: [String],
    highlights: [String],
    commonImages: [String],
    variant: {
        allColors: [String],
        allSizes: [String],
        variantData: [{
            color: String,
            size: String,
            price: Number,
            images: [String],
        }],
    },

};

*/
