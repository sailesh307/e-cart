const Cart = require('../models/Cart');

const checkCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ 
            user: user.userId,
        });
        // If the user doesn't have a cart, create one
        if (!cart) {
            const newCart = new Cart({ user: user.userId });
            await newCart.save();
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    checkCart,
};