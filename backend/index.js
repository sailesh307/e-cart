const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from a .env file if needed
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import route files
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const shoppingCartRoutes = require('./routes/shoppingCartRoutes');

// Use the routes in your Express app
app.get('/', (req, res) => {
    res.send('This is e-cart api');
});
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/cart', shoppingCartRoutes);
// ...other server setup code...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
