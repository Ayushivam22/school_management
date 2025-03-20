// Load environment variables from .env file (must be the first line)
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes'); // Import school routes
const db = require('./db'); // Import database connection module

// Initialize Express app
const app = express();

// Define the port number, fallback to 3000 if PORT is not defined in .env
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Route handling for all endpoints starting with '/api'
app.use('/api', schoolRoutes);

// Establish connection to the MySQL database
// Using a connection pool to efficiently manage multiple connections
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err); // Log error if connection fails
        return;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the acquired connection back to the pool
});

// Start the Express server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log successful server start
});
