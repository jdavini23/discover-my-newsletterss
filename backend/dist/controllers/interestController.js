"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestController = void 0;
const database_1 = require("../config/database");
const Interest_1 = require("../models/Interest");
const User_1 = require("../models/User");
class InterestController {
    // GET /interests
    static async getAllInterests(req, res) {
        try {
            // Ensure the database connection is established
            if (!database_1.AppDataSource.isInitialized) {
                await database_1.AppDataSource.initialize();
            }
            const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
            const interests = await interestRepository.find();
            return res.json(interests);
        }
        catch (error) {
            console.error('Error in getAllInterests:', error);
            return res.status(500).json({
                message: 'Error fetching interests',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // POST /users/:id/preferences
    static async updateUserPreferences(req, res) {
        try {
            // Ensure the database connection is established
            if (!database_1.AppDataSource.isInitialized) {
                await database_1.AppDataSource.initialize();
            }
            const userId = req.params.id;
            const { interestIds } = req.body;
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
            // Find user
            const user = await userRepository.findOne({
                where: { id: userId },
                relations: ['preferences']
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Find all interests
            const interests = await interestRepository.findByIds(interestIds);
            if (interests.length !== interestIds.length) {
                return res.status(400).json({ message: 'Some interests were not found' });
            }
            // Update user preferences
            user.preferences = interests;
            await userRepository.save(user);
            return res.json({ message: 'Preferences updated successfully', preferences: interests });
        }
        catch (error) {
            console.error('Error in updateUserPreferences:', error);
            return res.status(500).json({
                message: 'Error updating preferences',
                error: error instanceof Error ? error.message : error
            });
        }
    }
    // POST /interests/wizard
    static async getInterestWizardQuestions(req, res) {
        try {
            // Ensure the database connection is established
            if (!database_1.AppDataSource.isInitialized) {
                await database_1.AppDataSource.initialize();
            }
            console.log('Fetching interests for wizard...');
            const interestRepository = database_1.AppDataSource.getRepository(Interest_1.Interest);
            const interests = await interestRepository.find();
            console.log('Interests found:', interests.length);
            // Group interests into categories/questions
            const questions = [
                {
                    id: 1,
                    question: 'What type of content interests you the most?',
                    options: interests.map(interest => ({
                        id: interest.id,
                        name: interest.name,
                        description: interest.description,
                        icon: interest.icon
                    }))
                }
            ];
            return res.json(questions);
        }
        catch (error) {
            console.error('Error in getInterestWizardQuestions:', error);
            return res.status(500).json({
                message: 'Error fetching wizard questions',
                error: error instanceof Error ? error.message : error
            });
        }
    }
}
exports.InterestController = InterestController;
