import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../data');
const filePath = (name) => join(DATA_DIR, `${name}.json`);

const readDB = (name) => {
  try { return JSON.parse(readFileSync(filePath(name), 'utf-8')); }
  catch { return name === 'favorites' || name === 'history' ? [] : {}; }
};
const writeDB = (name, data) => writeFileSync(filePath(name), JSON.stringify(data, null, 2));

export const getFavorites = () => readDB('favorites');
export const addFavorite = (city) => {
  const favorites = readDB('favorites');
  const normalized = city.trim().toLowerCase();
  if (favorites.find(f => f.city.toLowerCase() === normalized))
    return { success: false, message: `${city} is already in favorites` };
  favorites.push({ city: city.trim(), addedAt: new Date().toISOString() });
  writeDB('favorites', favorites);
  return { success: true, message: `${city} added to favorites` };
};
export const removeFavorite = (city) => {
  const favorites = readDB('favorites');
  const updated = favorites.filter(f => f.city.toLowerCase() !== city.toLowerCase());
  if (updated.length === favorites.length)
    return { success: false, message: `${city} not found in favorites` };
  writeDB('favorites', updated);
  return { success: true, message: `${city} removed from favorites` };
};
export const getHistory = () => readDB('history');
export const addToHistory = (city, weatherData) => {
  const history = readDB('history');
  history.unshift({ city: city.trim(), searchedAt: new Date().toISOString(), temperature: weatherData?.temperature ?? null, condition: weatherData?.condition ?? 'unknown' });
  writeDB('history', history.slice(0, 20));
};
export const clearHistory = () => { writeDB('history', []); return { success: true }; };
