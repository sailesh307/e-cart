const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:productId', productController.getProductById);

// Update a product by ID
router.put('/:productId', productController.updateProductById);

// Delete a product by ID
router.delete('/:productId', productController.deleteProductById);

module.exports = router;
