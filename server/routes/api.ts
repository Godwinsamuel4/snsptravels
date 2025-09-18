
import { Router } from 'express';
import { healthCheck, getApiInfo } from '../controllers/apiController';

const router = Router();

// Health check endpoint
router.get('/health', healthCheck);

// API info endpoint  
router.get('/', getApiInfo);

export { router as apiRoutes };
