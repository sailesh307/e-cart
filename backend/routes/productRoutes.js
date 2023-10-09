const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const sellerMiddleware = require('../middleware/sellerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// @route  GET /api/products
// @desc   Create a new product
router.post('/', authMiddleware, sellerMiddleware, productController.createProduct);

// @route  GET /api/products
// @desc   Get all products on search
router.get('/', productController.searchProducts);

// @route  GET /api/products/id/:productId
// @desc   Get a single product by ID
router.get('/id/:productId', productController.getProductById);


////////////// Seller Routes //////////////
// @route  GET /api/products/seller
// @desc   Get all products of a seller
router.get('/seller', authMiddleware, sellerMiddleware, productController.getProductsBySeller);

// @route  PUT /api/products/id/:productId
// @desc   Update a product by ID
router.put('/id/:productId', productController.updateProductById);

// @route  DELETE /api/products/id/:productId
// @desc   Delete a product by ID
router.delete('/id/:productId', productController.deleteProductById);

module.exports = router;