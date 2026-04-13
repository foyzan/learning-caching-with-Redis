const express = require('express');
const cors = require('cors'); // 1. Added cors import
const router = require('./routes'); // 2. Fixed router import

const app = express();

// --- Global Middleware ---
app.use(express.json()); // Parses incoming JSON payloads
app.use(cors({}));       // Enables Cross-Origin Resource Sharing

// --- Routes ---
// 3. Mounted the router to a specific base path (Optional, but clean)
app.use('/api/v1', router);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    // 1. Log the error for the developers
    console.error(`[Error] ${err.message}`);

    console.log(err)

    // 2. Determine the status code
    const statusCode = err.status || 500;

    // 3. Send the response
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        // 4. Only show the stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;