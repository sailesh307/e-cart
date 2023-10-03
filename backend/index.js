const app = require('./app'); // Import the Express app from app.js

const PORT = process.env.PORT || 5000;

// Load environment variables from a .env file if needed
dotenv.config();

// Middleware
// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
}));
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
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
// Use the routes
app.get('/', (req, res) => {
    res.send('This is e-cart api');
});
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
// ...other server setup code...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on 'http://localhost:${PORT}'`);
});