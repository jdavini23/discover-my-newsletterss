import express from 'express';
import { NewsletterController } from '../controllers/newsletterController';
import { checkJwt } from '../middleware/checkJwt';

const router = express.Router();
const newsletterController = new NewsletterController();

// Create a new newsletter (Admin only)
router.post('/', checkJwt, newsletterController.createNewsletter);

// Fetch newsletters (Public)
router.get('/', newsletterController.fetchNewsletters);

// Get newsletter by ID (Public)
router.get('/:id', newsletterController.getNewsletterById);

export default router;
