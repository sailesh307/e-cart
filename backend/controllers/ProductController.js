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
        res.status(500).json({ message: 'Failed to create product' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        // check if thhere is any variant data
        // TODO: 
        // if (!req.body.variant.variantData.length > 0) {
        //     return res.status(400).json({ message: 'Product must have at least one variant' });
        // }

        const updatedProduct = await Product.findByIdAndUpdate(
            {_id: req.params.productId},
            { $set: req.body},
            { new: true },
            { runValidators: true}
        );
        if (!updatedProduct) {
            return res.status(404).json({ message : 'Product not found' })
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

// Search products by category name or product name
exports.searchProducts = async (req, res) => {
    try {
        let { query, sort = null, limit = 10, page = 1 } = req.query; // Get the search query from the request query parameters
        if (page < 1) {
            page = 1;
        }
        
        // decode the sort query parameter
        let sortObject;
        switch (sort) {
            case 'priceLowToHigh':
                sortObject = { price: 1 };
                break;
            case 'priceHighToLow':
                sortObject = { price : -1 };
                break;
            case 'bestRating':
                sortObject = { rating: -1 };
                break;
            case 'popular':
                sortObject = { ratingCount: -1 };
                break;
            default:
                sortObject = { createdAt: -1 };
        }
        
        const skipCount = (page - 1) * limit; // Calculate the number of documents to skip based on page and limit

        const matchStage = query ? {
            $or: [
                { category: { $regex: query, $options: 'i' } },
                { name: { $regex: query, $options: 'i' } },
                { keywords: { $in: [query] } }
            ],
        } : {};

        const products = await Product.find(matchStage).sort(sortObject).skip(skipCount).limit(limit);
        

        const totalProducts = await Product.countDocuments(matchStage);

        const response = {
            products,
            totalProducts,
            currentPage: parseInt(page),
            limit,
            totalPages: Math.ceil(totalProducts / limit),
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search for products' });
    }
};

// Get all products of a seller
exports.getProductsBySeller = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        
        if(page < 1) return res.status(400).json({ message: 'Invalid page number' });
        const pageSize = 10;
        // if admin is requesting, return all products
        if (req.user.role === 'admin') {
            const totalProducts = await Product.countDocuments();
            const totalPages = Math.ceil(totalProducts / pageSize);

            if (page > totalPages) return res.status(400).json({ message: 'Invalid page number' });

            const products = await Product.find()
                .sort({ createdAt: -1 })
                .limit(pageSize)
                .skip((page - 1) * pageSize);
            return res.json({
                products,
                totalPages,
                currentPage: page,
                totalProducts,
            });
        }

        // else return products of the seller
        const totalProducts = await Product.countDocuments({ sellerId: req.user.userId });
        const totalPages = Math.ceil(totalProducts / pageSize);

        if (page > totalPages) return res.status(404).json({ message: 'Invalid page number' });

        const products = await Product.find({ sellerId: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip((page - 1) * pageSize);
        res.json({
            products,
            totalPages,
            currentPage: page,
            totalProducts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};