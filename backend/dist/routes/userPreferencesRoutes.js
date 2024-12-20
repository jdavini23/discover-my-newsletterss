"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userPreferencesController_1 = require("../controllers/userPreferencesController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const userPreferencesController = new userPreferencesController_1.UserPreferencesController();
// Update user preferences
router.put('/preferences', authMiddleware_1.authMiddleware, async (req, res, next) => {
    try {
        await userPreferencesController.updateUserPreferences(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Get user preferences
router.get('/preferences', authMiddleware_1.authMiddleware, async (req, res, next) => {
    try {
        await userPreferencesController.getUserPreferences(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
