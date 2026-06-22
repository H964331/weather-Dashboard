import { getHistory } from '../../database/db.js';

export const computeAnalytics = (forecastDays = []) => {
  if (!forecastDays.length) return { averageTemperature: null, hottestDay: null, coldestDay: null, rainfallFrequency: null, humidityTrend: [], windTrend: [], message: 'No forecast data available.' };
  const temps = forecastDays.map(d => d.temperature).filter(t => t !== null);
  const rainyDays = forecastDays.filter(d => d.condition?.toLowerCase().includes('rain') || d.condition?.toLowerCase().includes('drizzle'));
  const averageTemperature = temps.length ? parseFloat((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)) : null;
  const hottestDay = forecastDays.reduce((max, d) => d.temperature > (max?.temperature ?? -Infinity) ? d : max, null);
  const coldestDay = forecastDays.reduce((min, d) => d.temperature < (min?.temperature ?? Infinity) ? d : min, null);
  const rainfallFrequency = forecastDays.length ? parseFloat(((rainyDays.length / forecastDays.length) * 100).toFixed(1)) : 0;
  const humidityTrend = forecastDays.map(d => ({ date: d.date, humidity: d.humidity ?? null }));
  const windTrend = forecastDays.map(d => ({ date: d.date, windSpeed: d.windSpeed ?? null }));
  return { averageTemperature, hottestDay: hottestDay ? { date: hottestDay.date, temperature: hottestDay.temperature } : null, coldestDay: coldestDay ? { date: coldestDay.date, temperature: coldestDay.temperature } : null, rainfallFrequency, humidityTrend, windTrend };
};

export const prepareChartData = (forecastDays = []) => ({
  temperatureChart: { labels: forecastDays.map(d => d.date ?? 'N/A'), datasets: [{ label: 'Temperature (°C)', data: forecastDays.map(d => d.temperature ?? null), borderColor: '#f97316', backgroundColor: 'rgba(249,115,22,0.2)' }] },
  humidityChart: { labels: forecastDays.map(d => d.date ?? 'N/A'), datasets: [{ label: 'Humidity (%)', data: forecastDays.map(d => d.humidity ?? null), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }] },
  windChart: { labels: forecastDays.map(d => d.date ?? 'N/A'), datasets: [{ label: 'Wind Speed (km/h)', data: forecastDays.map(d => d.windSpeed ?? null), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)' }] }
});

export const getSearchAnalytics = () => {
  const history = getHistory();
  if (!history.length) return { mostSearched: [], totalSearches: 0 };
  const cityCount = {};
  history.forEach(h => { const city = h.city.toLowerCase(); cityCount[city] = (cityCount[city] || 0) + 1; });
  const mostSearched = Object.entries(cityCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([city, count]) => ({ city, count }));
  return { totalSearches: history.length, mostSearched, recentSearches: history.slice(0, 5) };
};
