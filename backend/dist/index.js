"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import database initialization
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
// Import routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const interestRoutes_1 = __importDefault(require("./routes/interestRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/interests', interestRoutes_1.default);
// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});
const startServer = async () => {
    try {
        // Initialize database connection
        await (0, database_1.initializeDatabase)();
        // Initialize Redis
        await (0, redis_1.initializeRedis)();
        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('Shutting down server...');
            server.close(() => {
                console.log('HTTP server closed');
                // Close database and Redis connections
                (0, redis_1.closeRedisConnection)();
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
// Run the server
startServer();
