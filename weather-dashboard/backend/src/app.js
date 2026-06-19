import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Weather Dashboard API is running' });
});

// Feature routes
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler — keep this last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Weather Dashboard API running on http://localhost:${PORT}`);
});

export default app;
