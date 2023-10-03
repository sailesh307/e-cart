const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const sellerMiddleware = require('../middleware/sellerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new product
router.post('/', authMiddleware, sellerMiddleware, productController.createProduct);

// Get all products
router.get('/', productController.searchProducts);

// Get a single product by ID
router.get('/id/:productId', productController.getProductById);


////////////// Seller Routes //////////////
// @route  GET /api/products/seller
// @desc   Get all products of a seller
router.get('/seller', authMiddleware, sellerMiddleware, productController.getProductsBySeller);

// Update a product by ID
router.put('/id/:productId', productController.updateProductById);

// Delete a product by ID
router.delete('/id/:productId', productController.deleteProductById);

module.exports = router;
