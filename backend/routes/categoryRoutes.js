const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a single category by ID
router.get('/:categoryId', categoryController.getCategoryById);

// Update a category by ID
router.put('/:categoryId', categoryController.updateCategoryById);

// Delete a category by ID
router.delete('/:categoryId', categoryController.deleteCategoryById);

module.exports = router;