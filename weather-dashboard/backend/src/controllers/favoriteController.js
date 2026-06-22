import { getFavorites, addFavorite, removeFavorite } from '../../database/db.js';

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = getFavorites();
    res.json(favorites);
  } catch (err) { next(err); }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { city } = req.body;
    if (!city || typeof city !== 'string') return res.status(400).json({ error: 'A valid "city" is required' });
    const result = addFavorite(city);
    res.status(result.success ? 201 : 409).json(result);
  } catch (err) { next(err); }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { city } = req.params;
    const result = removeFavorite(city);
    res.status(result.success ? 200 : 404).json(result);
  } catch (err) { next(err); }
};
