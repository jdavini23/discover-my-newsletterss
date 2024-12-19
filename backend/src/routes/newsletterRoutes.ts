import express from 'express';
import { NewsletterController } from '../controllers/newsletterController';
import { checkJwt } from '../middleware/checkJwt';

const router = express.Router();
const newsletterController = new NewsletterController();

// Create a new newsletter 
router.post('/', newsletterController.createNewsletter);

// Fetch newsletters 
router.get('/', newsletterController.fetchNewsletters);

// Get newsletter by ID 
router.get('/:id', newsletterController.getNewsletterById);

export default router;
