import express from 'express';
import { getAnalytics, getChartData, getSearchStats } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/', getAnalytics);
router.get('/charts', getChartData);
router.get('/searches', getSearchStats);

export default router;
