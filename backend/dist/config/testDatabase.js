"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardownTestDatabase = exports.clearDatabase = exports.setupTestDatabase = exports.getTestDataSource = void 0;
const typeorm_1 = require("typeorm");
// Import all entities
const User_1 = require("../models/User");
const Newsletter_1 = require("../models/Newsletter");
const Interest_1 = require("../models/Interest");
const Subscription_1 = require("../models/Subscription");
const UserInteraction_1 = require("../models/UserInteraction");
let testDataSource = null;
const getTestDataSource = () => {
    if (!testDataSource) {
        testDataSource = new typeorm_1.DataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            dropSchema: true,
            logging: false,
            entities: [
                User_1.User,
                Newsletter_1.Newsletter,
                Interest_1.Interest,
                Subscription_1.Subscription,
                UserInteraction_1.UserInteraction
            ]
        });
    }
    return testDataSource;
};
exports.getTestDataSource = getTestDataSource;
const setupTestDatabase = async () => {
    try {
        const dataSource = (0, exports.getTestDataSource)();
        // If already initialized, destroy first
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
        // Reinitialize the database
        await dataSource.initialize();
        console.log('Test database initialized successfully');
        // Log the current state of the database
        const interestRepo = dataSource.getRepository(Interest_1.Interest);
        const interests = await interestRepo.find();
        console.log('Current Interests in Database:', interests);
    }
    catch (error) {
        console.error('Error initializing test database:', error);
        throw error;
    }
};
exports.setupTestDatabase = setupTestDatabase;
const clearDatabase = async () => {
    try {
        const dataSource = (0, exports.getTestDataSource)();
        if (dataSource.isInitialized) {
            const entities = dataSource.entityMetadatas;
            for (const entity of entities) {
                const repository = dataSource.getRepository(entity.target);
                await repository.clear();
            }
        }
    }
    catch (error) {
        console.error('Error clearing test database:', error);
        throw error;
    }
};
exports.clearDatabase = clearDatabase;
const teardownTestDatabase = async () => {
    try {
        const dataSource = (0, exports.getTestDataSource)();
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('Test database destroyed successfully');
        }
    }
    catch (error) {
        console.error('Error destroying test database:', error);
        throw error;
    }
};
exports.teardownTestDatabase = teardownTestDatabase;
