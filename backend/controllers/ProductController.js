const Product = require('../models/Product');

const User = require('../models/User');

// Create a new product
exports.createProducts = async (req, res) => {
    try {
        const { seller, products } = req.body;

        // check if the seller exists
        const existingSeller = await User.findOne({ username: seller });
        if (!existingSeller) {
            return res.status(400).json({ error: 'Seller not found' });
        }

        // an arrat to store saved products
        const savedProducts = [];

        // loop through each product in the array
        for (const productData of products) {
            const { category, name, description, price, quantity, imageUrls } = productData;

            // create a new product
            const product = new Product({ category, name, description, price, quantity, imageUrls, seller });

            // save the product
            const savedProduct = await product.save();

            // push the saved product to the array
            savedProducts.push(savedProduct);
        }

        res.status(201).json(savedProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create products' });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
