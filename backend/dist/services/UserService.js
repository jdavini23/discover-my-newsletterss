"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
const Interest_1 = require("../models/Interest");
const authUtils_1 = require("../utils/authUtils");
const database_1 = require("../config/database");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor(dataSource = database_1.AppDataSource) {
        this.dataSource = dataSource;
        this.userRepository = this.dataSource.getRepository(User_1.User);
        this.interestRepository = this.dataSource.getRepository(Interest_1.Interest);
    }
    async registerUser(email, password, firstName, lastName, preferences) {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Hash password
        const hashedPassword = await (0, authUtils_1.hashPassword)(password);
        // Create user
        const user = new User_1.User();
        user.email = email;
        user.passwordHash = hashedPassword;
        user.name = firstName && lastName ? `${firstName} ${lastName}` : email;
        user.isEmailVerified = false;
        // Handle preferences if provided
        if (preferences && preferences.length > 0) {
            const userInterests = [];
            for (const pref of preferences) {
                let interest = await this.interestRepository.findOne({ where: { name: pref } });
                if (!interest) {
                    interest = this.interestRepository.create({ name: pref });
                    interest = await this.interestRepository.save(interest);
                }
                userInterests.push(interest);
            }
            user.preferences = userInterests;
        }
        // Save user
        const savedUser = await this.userRepository.save(user);
        // Generate token
        const token = (0, authUtils_1.generateToken)(savedUser.id);
        return { user: savedUser, token };
    }
    async loginUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await (0, authUtils_1.comparePasswords)(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = (0, authUtils_1.generateToken)(user.id);
        return { user, token };
    }
    async initiatePasswordReset(email) {
        console.log('Initiating Password Reset for Email:', email);
        const user = await this.userRepository.findOne({ where: { email } });
        console.log('Found User:', user);
        if (!user) {
            throw new Error('No user found with this email');
        }
        // Generate reset token
        const resetToken = (0, authUtils_1.generatePasswordResetToken)();
        const hashedResetToken = await bcrypt_1.default.hash(resetToken, 10);
        // Set reset token and expiration
        user.passwordResetToken = hashedResetToken;
        user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now
        await this.userRepository.save(user);
        console.log('Generated Reset Token:', resetToken);
        return resetToken; // This is the unhashed token to be sent to user's email
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({
            where: {
                passwordResetExpires: (0, typeorm_1.MoreThan)(new Date())
            }
        });
        if (!user || !user.passwordResetToken) {
            throw new Error('Invalid or expired reset token');
        }
        // Compare reset token using bcrypt
        const isTokenValid = await bcrypt_1.default.compare(token, user.passwordResetToken);
        if (!isTokenValid) {
            throw new Error('Invalid or expired reset token');
        }
        // Hash new password
        const hashedPassword = await (0, authUtils_1.hashPassword)(newPassword);
        // Update user's password and clear reset token
        user.passwordHash = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await this.userRepository.save(user);
    }
    async updateUserPreferences(userId, preferenceNames) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        // Convert preference names to Interest objects
        const userInterests = [];
        for (const pref of preferenceNames) {
            let interest = await this.interestRepository.findOne({ where: { name: pref } });
            if (!interest) {
                interest = this.interestRepository.create({ name: pref });
                interest = await this.interestRepository.save(interest);
            }
            userInterests.push(interest);
        }
        user.preferences = userInterests;
        return this.userRepository.save(user);
    }
}
exports.UserService = UserService;
