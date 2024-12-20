"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newsletterController_1 = require("../controllers/newsletterController");
const router = express_1.default.Router();
const newsletterController = new newsletterController_1.NewsletterController();
// Create a new newsletter 
router.post('/', newsletterController.createNewsletter);
// Fetch newsletters 
router.get('/', newsletterController.fetchNewsletters);
// Get newsletter by ID 
router.get('/:id', newsletterController.getNewsletterById);
exports.default = router;
