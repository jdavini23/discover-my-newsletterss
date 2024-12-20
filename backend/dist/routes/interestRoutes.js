"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interestController_1 = require("../controllers/interestController");
const checkJwt_1 = require("../middleware/checkJwt");
const router = (0, express_1.Router)();
// Get all interests (public route)
router.get('/interests', interestController_1.InterestController.getAllInterests);
// Update user preferences (protected route)
router.post('/users/:id/preferences', [checkJwt_1.checkJwt], interestController_1.InterestController.updateUserPreferences);
// Get interest wizard questions (public route)
router.get('/interests/wizard', interestController_1.InterestController.getInterestWizardQuestions);
exports.default = router;
