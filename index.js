// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import required dependencies
const express = require('express'); // Express framework for routing and server management
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const sequelize = require('./config/sequelize'); // Sequelize ORM instance to interact with the database

//routes
const userRoutes = require('./routes/userRoutes'); // Routes for user management
const inventoryRoutes = require('./routes/inventroyRoutes'); // Routes for inventory management
const menuItemsRoutes = require('./routes/menuItemRoutes'); // Routes for menu items
const tableRoutes = require('./routes/tableRoutes'); // Routes for table management
const reservationRoutes = require('./routes/reservationRoutes'); // Routes for reservation management
const orderRoutes = require('./routes/orderRoutes'); // Routes for order management
const orderItemsRoutes = require('./routes/orderItemsRoutes'); // Routes for order items management
// Initialize Express application
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set up routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/inventory', inventoryRoutes); // Inventory-related routes
app.use('/api/menu-items', menuItemsRoutes); // Menu items-related routes
app.use('/api/tables', tableRoutes); // Table-related routes
app.use('/api/reservations', reservationRoutes); // Reservation-related routes
app.use('/api/orders', orderRoutes); // Order-related routes
app.use('/api/order-items', orderItemsRoutes); // Order items-related routes
// Sync Sequelize models with the database
sequelize
  .sync() // Synchronize Sequelize models with the database schema
  .then(() => {
    // Log success message when models are synchronized
    console.log('Sequelize models are synchronized with the database.');
  })
  .catch((error) => {
    // Log error if synchronization fails
    console.error('Error syncing Sequelize models:', error);
  });

// Define the port for the server to listen on (either from environment or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  // Log a success message with the port number when the server starts
  console.log(`🚀 Server running on port ${PORT}`);
});
