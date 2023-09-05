const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

///////////////////// Common /////////////////////
// Get all categories
router.get('/', authMiddleware, categoryController.getAllCategories);

///////////////////// Admin /////////////////////
// Create a new category
router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);
// Get a single category by ID
router.get('/:categoryId', authMiddleware, adminMiddleware, categoryController.getCategoryById);
// Update a category by ID
router.put('/:categoryId', authMiddleware, adminMiddleware, categoryController.updateCategoryById);
// Delete a category by ID
router.delete('/:categoryId', authMiddleware, adminMiddleware, categoryController.deleteCategoryById);

module.exports = router;