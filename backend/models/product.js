const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    price: Number,
    images: [{
        type: String,
        required: true,
    }],
});

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: String,
        enum: ['phone', 'clothing'],
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

    variant: {
        allColors: [String],
        allSizes: [String],
        variantData: [variantSchema],
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
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);


// sample data
/* 
const data = {
    seller: "64f47230eb36c0ba94bdf171",
    category: "smartphone",
    name: "Apple iPhone 14 Pro",
    description: "NA",
    brand: "Apple",
    details: "NA",
    highlights: [
        "15.49 cm (6.1 inch) Super Retina XDR Display",
        "48MP + 12MP + 12MP | 12MP Front Camera",
        "A16 Bionic Chip, 6 Core Processor Processor"
    ],
    variant: {
        allColors: ["Space Black", "Gold"],
        allSizes: ["256 GB", "1 TB", "128 GB"],
        variantData: [
            { id: 1, color: "Space Black", size: "256 GB", price: 129999, images: ["https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/l/p/-original-imaghxemc3wtcuhb.jpeg?q=70", "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/r/0/6/-original-imaghxemsfczqrvb.jpeg?q=70"] },
            { id: 2, color: "Space Black", size: "1 TB", price: 169999, images: ["https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/y/l/p/-original-imaghxemc3wtcuhb.jpeg?q=70", "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/r/0/6/-original-imaghxemsfczqrvb.jpeg?q=70"] },
            { id: 3, color: "Gold", size: "128 GB", price: 119990, images: ["https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/i/h/c/-original-imaghxemmqyahnuj.jpeg?q=70", "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/s/l/-original-imaghxemhkf65etg.jpeg?q=70"] },
            { id: 4, color: "Gold", size: "1 TB", price: 169990, images: ["https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/i/h/c/-original-imaghxemmqyahnuj.jpeg?q=70", "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/9/s/l/-original-imaghxemhkf65etg.jpeg?q=70"] },
        ]
    }
};

*/