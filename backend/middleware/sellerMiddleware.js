
const User = require('../models/User');

// Middleware function to check if the user is an seller
const adminMiddleware = async (req, res, next) => {
    try {
        const { userId } = req.user;
        // check the user role
        const user = await User.findOne({ _id: userId });
        if (user.role === 'seller') {
            next();
        } else {
            return res.status(401).json({ message: 'Authorization denied. User is not an seller.' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error.' });
    }
}

module.exports = adminMiddleware;