import express from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../controllers/favoriteController.js';

const router = express.Router();

// GET /api/favorites
router.get('/', getFavorites);

// POST /api/favorites  body: { city: "London" }
router.post('/', addFavorite);

// DELETE /api/favorites/:city
router.delete('/:city', removeFavorite);

export default router;
