# Weather Dashboard

A full-stack weather dashboard: search any city, see current conditions, a 5-day
forecast, and save favorite cities. Built with **React + Vite** on the frontend
and **Node.js + Express** on the backend.

## Project status

This repo currently contains the **project skeleton** — folder structure, base
configs, and stub components/routes that compile and run, but don't yet talk to
a real weather provider. See `PROJECT_DOCUMENTATION.md` for the team task split
and what's left to build.

## Project structure

```
weather-dashboard/
├── frontend/        React + Vite app
│   ├── public/weather-icons/   static icon assets go here
│   └── src/
│       ├── components/         SearchBar, WeatherCard, ForecastCard, Favorites, Header
│       ├── services/           weatherApi.js — fetch wrapper for backend calls
│       └── styles/             app.css
├── backend/         Node + Express API
│   ├── src/
│   │   ├── routes/             weatherRoutes.js, favoriteRoutes.js
│   │   ├── controllers/        request handlers
│   │   ├── services/           weatherService.js (external API), cacheService.js
│   │   ├── middleware/         errorHandler.js
│   │   └── utils/               helpers.js
│   └── data/                   favorites.json, cache.json, history.json (local JSON "DB")
├── README.md
└── PROJECT_DOCUMENTATION.md
```

## Getting started

### Backend

```bash
cd backend
npm install
cp .env .env.local   # or just edit .env directly with your real API key
npm run dev           # starts on http://localhost:5000 (nodemon)
```

### Frontend

```bash
cd frontend
npm install
npm run dev           # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so the
frontend can call `fetch('/api/weather/current?city=London')` directly — no
CORS config needed in dev.

## Environment variables (`backend/.env`)

```
PORT=5000
WEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
CACHE_TTL_MINUTES=10
```

`.env` is committed here with placeholder values only, as a template for the
team. It's also listed in `.gitignore`, so once you put a real key in it
locally, `git status` won't show it as changed — just don't run
`git add -f .env` after that.

## Team task split

| Area | Owner | Status |
|---|---|---|
| Repo + frontend/backend skeleton | You | ✅ Done |
| Weather API integration (`weatherService.js`) | Teammate | 🔲 TODO |
| Frontend interactivity (wiring components to `weatherApi.js`) | Teammate | 🔲 TODO |
| Deployment | Teammate | 🔲 TODO |
| Documentation | Teammate | 🔲 TODO |

Every stub file with a `TODO (Teammate - ...)` comment marks a spot meant to be
filled in next.
