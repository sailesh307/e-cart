const User = require('../models/User');
// Assuming you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to register a new user
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        // check if empty string
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Check if the user with the given email or username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the user's password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        if (role) {
            newUser.role = role;
        }

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token for the newly created user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        // remove password from user object
        newUser.password = undefined;
        // Send the token and user object back to the client
        res.status(201).json({ user: newUser, token, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to handle user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        // If the passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // remove password from user object
        user.password = undefined;
        // Send the token and user object back to the client
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to fetch user profile
exports.profile = async (req, res) => {
    try {
        // Access the user ID from the JWT payload (provided by your auth middleware)
        const userId = req.user.userId;
        console.log(userId);

        // Fetch the user profile from the database based on the user ID
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};