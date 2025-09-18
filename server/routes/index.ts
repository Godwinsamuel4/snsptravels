
import { Router } from 'express';
import { apiRoutes } from './api';

const router = Router();

// Mount API routes
router.use('/api', apiRoutes);

export { router as routes };
