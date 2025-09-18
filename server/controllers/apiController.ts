
import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'API is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
};

export const getApiInfo = (req: Request, res: Response) => {
  res.status(200).json({
    name: 'SN.SP Travel Agency API',
    version: '1.0.0',
    description: 'Backend API for travel booking and management',
    endpoints: [
      'GET /api - API information',
      'GET /api/health - Health check'
    ]
  });
};
