import * as cacheService from './cacheService.js';

// TODO (Teammate - API integration):
// Replace the placeholder objects below with real calls to a weather
// provider (e.g. OpenWeatherMap, WeatherAPI.com). Use axios + process.env.WEATHER_API_KEY
// and process.env.WEATHER_API_BASE_URL (already loaded via dotenv in app.js).
//
// Example shape once implemented:
//   const res = await axios.get(`${BASE_URL}/weather`, { params: { q: city, appid: API_KEY } });
//   return res.data;

export const fetchCurrentWeather = async (city) => {
  const cacheKey = `current:${city.toLowerCase()}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const data = {
    city,
    temperature: null,
    condition: 'unknown',
    humidity: null,
    windSpeed: null,
    note: 'Stub data — connect weatherService.js to a real weather API.',
  };

  cacheService.set(cacheKey, data);
  return data;
};

export const fetchForecast = async (city) => {
  const cacheKey = `forecast:${city.toLowerCase()}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const data = {
    city,
    days: [],
    note: 'Stub data — connect weatherService.js to a real weather API.',
  };

  cacheService.set(cacheKey, data);
  return data;
};

export const fetchHistory = async () => {
  // TODO: read backend/data/history.json and return recent searches
  return [];
};
