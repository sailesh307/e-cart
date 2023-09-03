const ShoppingCart = require('../models/ShoppingCart');

// Create a new shopping cart
exports.createShoppingCart = async (req, res) => {
    try {
        const { user, items } = req.body;
        const shoppingCart = new ShoppingCart({ user, items });
        const savedShoppingCart = await shoppingCart.save();
        res.status(201).json(savedShoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create shopping cart' });
    }
};

// Get all shopping carts
exports.getAllShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts = await ShoppingCart.find();
        res.json(shoppingCarts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shopping carts' });
    }
};

// Get a single shopping cart by ID
exports.getShoppingCartById = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.params.shoppingCartId);
        if (!shoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }
        res.json(shoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shopping cart' });
    }
};

// Update a shopping cart by ID
exports.updateShoppingCartById = async (req, res) => {
    try {
        const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
            req.params.shoppingCartId,
            req.body,
            { new: true }
        );
        if (!updatedShoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }
        res.json(updatedShoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update shopping cart' });
    }
};

// Delete a shopping cart by ID
exports.deleteShoppingCartById = async (req, res) => {
    try {
        const deletedShoppingCart = await ShoppingCart.findByIdAndRemove(req.params.shoppingCartId);
        if (!deletedShoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }
        res.json(deletedShoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete shopping cart' });
    }
};
