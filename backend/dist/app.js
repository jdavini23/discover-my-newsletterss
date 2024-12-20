"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const interestRoutes_1 = __importDefault(require("./routes/interestRoutes"));
const newsletterRoutes_1 = __importDefault(require("./routes/newsletterRoutes"));
const userPreferencesRoutes_1 = __importDefault(require("./routes/userPreferencesRoutes"));
const recommendationRoutes_1 = __importDefault(require("./routes/recommendationRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const userController_1 = require("./controllers/userController");
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/interests', interestRoutes_1.default);
app.use('/newsletters', newsletterRoutes_1.default);
app.use('/api/preferences', userPreferencesRoutes_1.default);
app.use('/api/recommendations', recommendationRoutes_1.default);
app.use('/api/users', userController_1.userRouter);
// 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: `Route ${req.originalUrl} not found`
    });
});
// Global error handler
app.use(errorHandler_1.errorHandler);
