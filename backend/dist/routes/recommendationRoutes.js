"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendationController_1 = require("../controllers/recommendationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const validationMiddleware_2 = require("../middleware/validationMiddleware");
const router = express_1.default.Router();
const recommendationController = new recommendationController_1.RecommendationController();
// Get personalized newsletter recommendations
router.get('/newsletters', authMiddleware_1.authMiddleware, (0, validationMiddleware_1.validateQuery)(validationMiddleware_2.PaginationQueryDto), (req, res, next) => {
    recommendationController.getPersonalizedRecommendations(req, res).catch(next);
});
// Get recommended interests
router.get('/interests', authMiddleware_1.authMiddleware, (0, validationMiddleware_1.validateQuery)(validationMiddleware_2.PaginationQueryDto), (req, res, next) => {
    recommendationController.getRecommendedInterests(req, res).catch(next);
});
exports.default = router;
