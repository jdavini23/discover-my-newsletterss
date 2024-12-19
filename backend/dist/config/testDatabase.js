"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardownTestDatabase = exports.setupTestDatabase = exports.TestDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const Interest_1 = require("../models/Interest");
const Newsletter_1 = require("../models/Newsletter");
const Subscription_1 = require("../models/Subscription");
const UserInteraction_1 = require("../models/UserInteraction");
exports.TestDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'joedavini',
    database: 'newsletters_test',
    synchronize: true,
    logging: false,
    entities: [
        User_1.User,
        Interest_1.Interest,
        Newsletter_1.Newsletter,
        Subscription_1.Subscription,
        UserInteraction_1.UserInteraction
    ]
});
const setupTestDatabase = async () => {
    try {
        await exports.TestDataSource.initialize();
        console.log('Test database initialized');
    }
    catch (error) {
        console.error('Error initializing test database', error);
        throw error;
    }
};
exports.setupTestDatabase = setupTestDatabase;
const teardownTestDatabase = async () => {
    try {
        await exports.TestDataSource.destroy();
        console.log('Test database connection closed');
    }
    catch (error) {
        console.error('Error closing test database', error);
    }
};
exports.teardownTestDatabase = teardownTestDatabase;
