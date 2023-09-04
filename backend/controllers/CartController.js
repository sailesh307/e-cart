const ShoppingCart = require('../models/ShoppingCart');

// Create a new shopping cart
exports.createOrUpdateShoppingCart = async (req, res) => {
    try {
        const { items } = req.body;
        console.log(req.user);
        const shoppingCart = await ShoppingCart.findOne({ user: req.user.userId });
        if (shoppingCart) {
            // Update shopping cart
            shoppingCart.items = items;
            await shoppingCart.save();
            return res.json(shoppingCart);
        }
        // Create new shopping cart
        const newShoppingCart = new ShoppingCart({
            user: req.user.userId,
            items: items || [ ],
        });
        await newShoppingCart.save();
        res.json(newShoppingCart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message : error.message, error: 'Failed to create or update shopping cart' });
    }
};

// Get shopping cart of current user
exports.getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findOne({ user: req.user.userId });
        if (!shoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }
        res.json(shoppingCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shopping carts' });
    }
};