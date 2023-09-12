const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const sellerMiddleware = require('../middleware/sellerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new product
router.post('/', authMiddleware, sellerMiddleware, productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/id/:productId', productController.getProductById);

// Update a product by ID
router.put('/id/:productId', productController.updateProductById);

// Delete a product by ID
router.delete('/id/:productId', productController.deleteProductById);

// search products by name or category
router.get('/search', productController.searchProducts);
module.exports = router;
