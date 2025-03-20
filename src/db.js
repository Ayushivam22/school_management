const mysql = require('mysql2/promise'); // ✅ Correct import for async/await
require('dotenv').config(); // Load environment variables from .env file

// Create a MySQL connection pool for efficient connection management
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Database host (from .env)
    user: process.env.DB_USER, // Database username (from .env)
    password: process.env.DB_PASS, // Database password (from .env)
    database: process.env.DB_NAME, // Database name (from .env)
    port: process.env.DB_PORT || 3306, // Default port for MySQL
    waitForConnections: true, // ✅ Ensures pool waits for available connections
    connectionLimit: 10, // Maximum number of active connections
    queueLimit: 0 // No limit for queued connection requests
});

// Test the database connection asynchronously
(async () => {
    try {
        const connection = await pool.getConnection(); // Acquire a connection
        console.log('Connected to MySQL database'); // Log successful connection
        connection.release(); // Important to release the connection after testing
    } catch (error) {
        console.error('Database connection failed:', error); // Log failure details
    }
})();

// Export the connection pool to be used in other modules
module.exports = pool;
