"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Import all entities
const User_1 = require("../models/User");
const Interest_1 = require("../models/Interest");
const Newsletter_1 = require("../models/Newsletter");
const Subscription_1 = require("../models/Subscription");
const UserInteraction_1 = require("../models/UserInteraction");
// Load environment variables
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'newsletters',
    synchronize: process.env.NODE_ENV === 'development', // Be cautious in production
    logging: process.env.NODE_ENV === 'development',
    entities: [
        User_1.User,
        Interest_1.Interest,
        Newsletter_1.Newsletter,
        Subscription_1.Subscription,
        UserInteraction_1.UserInteraction
    ],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});
// Initialize the database connection
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('Database connection established successfully');
    }
    catch (error) {
        console.error('Error during database initialization', error);
        process.exit(1);
    }
};
exports.initializeDatabase = initializeDatabase;
