const Cart = require('../models/Cart');

// Get shopping cart of current user
exports.getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await Cart.findOne({ user: req.user.userId });
        res.json(shoppingCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch shopping carts' });
    }
};

// add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const item = req.body;
        // check for item allready in cart
        const existingItem = await Cart.findOne({
            user: req.user.userId,
            'items.productId': item.productId,
            'items.variantId': item.variantId,
        });
        if (!existingItem) {
            // add item to cart
            const cart = await Cart.findOneAndUpdate(
                { user: req.user.userId },
                {
                    $push: {
                        items: item,
                    },
                },
                { new: true }
            );
            return res.json(existingItem);          
        }
        // return the same cart Item if item already exists
        res.json(existingItem);       

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};

// remove item from cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const itemId = req.params.id;
        const cart = await Cart.findOneAndUpdate(
            { user: req.user.userId },
            {
                $pull: {
                    items: {
                        _id: itemId,
                    },
                },
            },
            { new: true }
        );
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
};

// update item quantity
exports.updateItemQuantity = async (req, res) => {
    try {
        const itemId = req.params.id;
        const quantity = req.body.quantity;
        const cart = await Cart.findOneAndUpdate(
            { user: req.user.userId, 'items._id': itemId },
            {
                $set: {
                    'items.$.quantity': quantity,
                },
            },
            { new: true }
        );
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update item quantity' });
    }
};