import { computeAnalytics, prepareChartData, getSearchAnalytics } from '../services/analyticsService.js';
import * as weatherService from '../services/weatherService.js';
import { isValidCityName } from '../utils/helpers.js';

export const getAnalytics = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!isValidCityName(city)) return res.status(400).json({ error: 'A valid "city" query parameter is required' });
    const forecast = await weatherService.fetchForecast(city);
    const analytics = computeAnalytics(forecast.days || []);
    res.json({ city, analytics });
  } catch (err) { next(err); }
};

export const getChartData = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!isValidCityName(city)) return res.status(400).json({ error: 'A valid "city" query parameter is required' });
    const forecast = await weatherService.fetchForecast(city);
    const charts = prepareChartData(forecast.days || []);
    res.json({ city, charts });
  } catch (err) { next(err); }
};

export const getSearchStats = async (req, res, next) => {
  try {
    const stats = getSearchAnalytics();
    res.json(stats);
  } catch (err) { next(err); }
};
