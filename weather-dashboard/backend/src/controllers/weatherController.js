import * as weatherService from '../services/weatherService.js';
import { isValidCityName } from '../utils/helpers.js';

// TODO (Teammate - API integration): once weatherService talks to a real
// provider, these handlers don't need to change much — they just pass
// through to the service layer.

export const getCurrentWeather = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!isValidCityName(city)) {
      return res.status(400).json({ error: 'A valid "city" query parameter is required' });
    }
    const data = await weatherService.fetchCurrentWeather(city);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getForecast = async (req, res, next) => {
  try {
    const { city } = req.query;
    if (!isValidCityName(city)) {
      return res.status(400).json({ error: 'A valid "city" query parameter is required' });
    }
    const data = await weatherService.fetchForecast(city);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getWeatherHistory = async (req, res, next) => {
  try {
    const data = await weatherService.fetchHistory();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
