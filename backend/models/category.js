const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Additional fields as needed.
});

module.exports = mongoose.model('Category', categorySchema);
