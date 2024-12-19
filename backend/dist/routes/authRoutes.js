"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService_1 = require("../services/UserService");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const userService = new UserService_1.UserService();
// User Registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, preferences } = req.body;
        const user = await userService.registerUser(email, password, firstName, lastName, preferences);
        res.status(201).json({ user, message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
    }
});
// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
    }
});
// Initiate Password Reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const resetToken = await userService.initiatePasswordReset(email);
        res.json({
            message: 'Password reset token generated',
            resetToken: resetToken
        });
    }
    catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Password reset token generation failed' });
    }
});
// Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log('Reset Password Request:', { token, newPassword });
        await userService.resetPassword(token, newPassword);
        res.json({ message: 'Password reset successfully' });
    }
    catch (error) {
        console.error('Reset Password Error:', error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Password reset failed' });
    }
});
// Update User Preferences (Protected Route)
router.put('/preferences', authMiddleware_1.authMiddleware, async (req, res, next) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { preferences } = req.body;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Note: We'll need to modify this method in UserService to match the new structure
        const updatedUser = await userService.updateUserPreferences(userId, preferences);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Update failed' });
    }
});
exports.default = router;
