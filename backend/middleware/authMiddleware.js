const jwt = require('jsonwebtoken');

// Middleware function to check if the user is authenticated
const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('x-auth-token');

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }

    try {
        // Verify the token using your JWT secret (stored securely in your environment variables)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID from the token to the request object for use in subsequent middleware or routes
        req.user = decoded;

        // Continue to the next middleware or route
        next();
    } catch (error) {
        // If the token is invalid, expired, or any other verification error occurs
        return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
    }
};

module.exports = authMiddleware;
