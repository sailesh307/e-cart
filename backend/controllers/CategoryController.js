// controllers/categoryController.js

const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name, description, imageUrls } = req.body;
        const category = new Category({ name, description, imageUrls });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(deletedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
