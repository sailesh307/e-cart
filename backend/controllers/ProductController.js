const User = require('../models/User');
const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { userId } = req.user;

        // create a new product
        const newProduct = new Product({ ...req.body, sellerId: userId });

        // save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Get all products (paginated) (return on lowest price variant)
exports.getAllProducts = async (req, res) => {
    try {
        const {page = 1} = req.query;
        const products = await Product.find()
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ createdAt: -1 });
        // get the minimum price and data of the product
        let results = [];
        products.forEach((product) => {
            let minPriceVariant = product.variant.variantData.reduce((prev, current) => {
                return prev.price < current.price ? prev : current;
            });
            const thumbnail = minPriceVariant.images.length > 0 ? minPriceVariant.images[0] : product.commonImages[0];
            results.push({
                _id: product._id,
                name: product.name,
                thumbnail: thumbnail,
                price: minPriceVariant.price,
                sellerId: product.sellerId,
                extra: product.category !== 'clothing' ? minPriceVariant.color + ' | ' + minPriceVariant.size : null,
                rating: product.rating,
                ratingCount: product.ratingCount,
                variantId: minPriceVariant._id,
            });
        });
        res.json(results);
    } catch (error) {
        console.error(error);
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

// Search products by category name or product name
exports.searchProducts = async (req, res) => {
    try {
        const { query, limit = 10, page = 1 } = req.query; // Get the search query from the request query parameters

        const skipCount = (page - 1) * limit; // Calculate the number of documents to skip based on page and limit
        // if query is empty, return an all products
        // Use Mongoose to search for products by category name or product name
        const products = await Product.find(query ? ({
            $or: [
                { category: { $regex: query, $options: 'i' } }, // Case-insensitive search for category name
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
            ],
        }) : {})
            .limit(parseInt(limit)) // Limit the number of results returned);
            .skip(skipCount); // Skip the first n results (where n = (page - 1) * limit
        // send only
        const results = products.map((product) => ({
            _id: product._id,
            name: product.name,
            thumbnail: product.thumbnail,
            baseprice: product.baseprice,
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search for products' });
    }
};
