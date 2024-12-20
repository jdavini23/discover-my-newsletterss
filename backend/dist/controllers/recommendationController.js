"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationController = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Newsletter_1 = require("../models/Newsletter");
const Interest_1 = require("../models/Interest");
const redis_1 = require("../config/redis");
class RecommendationController {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
        this.newsletterRepository = database_1.AppDataSource.getRepository(Newsletter_1.Newsletter);
        this.interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
    }
    // Get personalized newsletter recommendations
    async getPersonalizedRecommendations(req, res) {
        try {
            const userId = req.user.id; // From JWT middleware
            const { page = 1, limit = 10 } = req.query;
            // Check cache first
            const cacheKey = `recommendations:newsletters:${userId}:page:${page}:limit:${limit}`;
            const cachedRecommendations = await redis_1.redisClient.get(cacheKey);
            if (cachedRecommendations) {
                return res.json(JSON.parse(cachedRecommendations));
            }
            // Find user with their preferences
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['preferences']
            });
            if (!user || !user.preferences || user.preferences.length === 0) {
                return res.status(200).json({
                    newsletters: [],
                    message: 'No preferences set for personalized recommendations'
                });
            }
            // Get user's interest IDs
            const interestIds = user.preferences.map(interest => interest.id);
            // Build recommendation query
            const queryBuilder = this.newsletterRepository.createQueryBuilder('newsletter')
                .leftJoinAndSelect('newsletter.interests', 'interests')
                .where('interests.id IN (:...interestIds)', { interestIds })
                .orderBy('newsletter.averageRating', 'DESC')
                .skip((Number(page) - 1) * Number(limit))
                .take(Number(limit));
            const [newsletters, total] = await queryBuilder.getManyAndCount();
            const result = {
                newsletters,
                page: Number(page),
                limit: Number(limit),
                total,
                matchedInterests: user.preferences
            };
            // Cache recommendations for 1 hour
            await redis_1.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
            res.json(result);
        }
        catch (error) {
            console.error('Error generating recommendations:', error);
            res.status(500).json({ error: 'Failed to generate recommendations' });
        }
    }
    // Get recommended interests based on existing newsletters
    async getRecommendedInterests(req, res) {
        try {
            const userId = req.user.id; // From JWT middleware
            const { limit = 5 } = req.query;
            // Check cache first
            const cacheKey = `recommendations:interests:${userId}:limit:${limit}`;
            const cachedInterests = await redis_1.redisClient.get(cacheKey);
            if (cachedInterests) {
                return res.json(JSON.parse(cachedInterests));
            }
            // Find user with their current preferences
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ['preferences']
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Get current interest IDs
            const currentInterestIds = user.preferences.map(interest => interest.id);
            // Find related interests based on newsletter topics
            const relatedInterests = await this.interestRepository.createQueryBuilder('interest')
                .leftJoin('interest.newsletters', 'newsletter')
                .where('newsletter.id IS NOT NULL')
                .andWhere('interest.id NOT IN (:...currentInterestIds)', { currentInterestIds })
                .groupBy('interest.id')
                .orderBy('COUNT(newsletter.id)', 'DESC')
                .limit(Number(limit))
                .getMany();
            const result = {
                recommendedInterests: relatedInterests,
                currentInterests: user.preferences
            };
            // Cache recommendations for 1 hour
            await redis_1.redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
            res.json(result);
        }
        catch (error) {
            console.error('Error finding recommended interests:', error);
            res.status(500).json({ error: 'Failed to find recommended interests' });
        }
    }
}
exports.RecommendationController = RecommendationController;
