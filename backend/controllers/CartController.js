const Cart = require('../models/Cart');
const Product = require('../models/Product')

// Function to populate the deatils of the cart item 
async function getProductDetails(productId, variantId) {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }

    // Find the variant details if variantId is provided
    const variantDetails = variantId
        ? product.variant.find((variant) => variant._id.toString() === variantId)
        : null;

    return {
        sellerId: product.sellerId,
        category: product.category,
        name: product.name,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        shippingFee: product.shippingFee,
        image: product.images[0],
        rating: product.rating,
        ratingCount: product.ratingCount,
        productId: product._id,
    };
}

// Get shopping cart of current user
exports.getShoppingCart = async (req, res) => {
    try {
        const shoppingCart = await Cart.findOne({ user: req.user.userId });

        // Fetch detailed product information for items in the cart
        const itemsWithDetails = await Promise.all(
            shoppingCart.items.map(async (item) => {
                const { productId, variantId, _id, quantity } = item;
                const productDetails = await getProductDetails(productId, variantId);
                return {
                    _id,
                    quantity,
                    ...productDetails,
                };
            })
        );

        res.json({items: itemsWithDetails});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch shopping carts' });
    }
};

// add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const {productId, variantId} = req.body;
        // check for item allready in cart
        const existingItem = await Cart.findOne({
            user: req.user.userId,
            'items.productId': productId,
            // 'items.variantId': variantId,
        });

        // Retrieve product details
        const productDetails = await getProductDetails(productId, variantId);

        if (!existingItem) {
            // add item to cart
            const cart = await Cart.findOneAndUpdate(
                { user: req.user.userId },
                {
                    $push: {
                        items: {productId, variantId},
                    },
                },
                { new: true }
            );
            // return the complete detail of added item 
            
            res.json({cart, ...productDetails})
        } else {
            // return the same cart Item if item already exists
            res.json({existingItem, ...productDetails});       
        }

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