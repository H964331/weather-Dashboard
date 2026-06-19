import fs from 'fs/promises';
import path from 'path';

const FAVORITES_PATH = path.resolve('data/favorites.json');

const readFavorites = async () => {
  const raw = await fs.readFile(FAVORITES_PATH, 'utf-8');
  return JSON.parse(raw || '[]');
};

const writeFavorites = async (favorites) => {
  await fs.writeFile(FAVORITES_PATH, JSON.stringify(favorites, null, 2));
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await readFavorites();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { city } = req.body;
    if (!city || typeof city !== 'string') {
      return res.status(400).json({ error: '"city" is required in the request body' });
    }
    const favorites = await readFavorites();
    if (!favorites.some((f) => f.toLowerCase() === city.toLowerCase())) {
      favorites.push(city);
      await writeFavorites(favorites);
    }
    res.status(201).json(favorites);
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { city } = req.params;
    const favorites = await readFavorites();
    const updated = favorites.filter((f) => f.toLowerCase() !== city.toLowerCase());
    await writeFavorites(updated);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
