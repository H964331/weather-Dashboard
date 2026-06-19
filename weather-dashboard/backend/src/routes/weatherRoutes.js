import express from 'express';
import {
  getCurrentWeather,
  getForecast,
  getWeatherHistory,
} from '../controllers/weatherController.js';

const router = express.Router();

// GET /api/weather/current?city=London
router.get('/current', getCurrentWeather);

// GET /api/weather/forecast?city=London
router.get('/forecast', getForecast);

// GET /api/weather/history
router.get('/history', getWeatherHistory);

export default router;
