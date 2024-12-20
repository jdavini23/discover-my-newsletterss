"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferencesController = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Interest_1 = require("../models/Interest");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const userPreferencesDto_1 = require("../dtos/userPreferencesDto");
const redis_1 = require("../config/redis");
class UserPreferencesController {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
        this.interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
    }
    // Update user preferences
    async updateUserPreferences(req, res) {
        try {
            const userId = req.user.id; // From JWT middleware
            // Transform and validate input
            const updateDto = (0, class_transformer_1.plainToClass)(userPreferencesDto_1.UpdateUserPreferencesDto, {
                ...req.body,
                userId
            });
            const validationErrors = await (0, class_validator_1.validate)(updateDto);
            if (validationErrors.length > 0) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: validationErrors.map(error => ({
                        property: error.property,
                        constraints: Object.values(error.constraints || {})
                    }))
                });
            }
            // Find the user
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['preferences']
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Process interests
            if (updateDto.interests) {
                const interestIds = updateDto.interests.map(i => i.id);
                const newInterests = await this.interestRepository.findByIds(interestIds);
                user.preferences = newInterests;
            }
            // Save updated user
            await this.userRepository.save(user);
            // Cache user preferences
            await redis_1.redisClient.set(`user:preferences:${userId}`, JSON.stringify(user.preferences));
            res.json({
                message: 'Preferences updated successfully',
                preferences: user.preferences
            });
        }
        catch (error) {
            console.error('Error updating preferences:', error);
            res.status(500).json({ error: 'Failed to update preferences' });
        }
    }
    // Fetch user preferences
    async getUserPreferences(req, res) {
        try {
            const userId = req.user.id; // From JWT middleware
            // Try to get from cache first
            const cachedPreferences = await redis_1.redisClient.get(`user:preferences:${userId}`);
            if (cachedPreferences) {
                return res.json({
                    interests: JSON.parse(cachedPreferences),
                    source: 'cache'
                });
            }
            // Fetch from database if not in cache
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['preferences']
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Cache for future requests
            await redis_1.redisClient.set(`user:preferences:${userId}`, JSON.stringify(user.preferences));
            res.json({
                interests: user.preferences,
                source: 'database'
            });
        }
        catch (error) {
            console.error('Error fetching preferences:', error);
            res.status(500).json({ error: 'Failed to fetch preferences' });
        }
    }
}
exports.UserPreferencesController = UserPreferencesController;
