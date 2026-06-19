# Project Documentation

> This file is a template. Fill in each section as the project develops.

## 1. Overview

- **Project name:** Weather Dashboard
- **Goal:** Let a user search a city and see current weather + a 5-day forecast,
  and save favorite cities for quick access.
- **Stack:** React (Vite) frontend, Node.js (Express) backend, local JSON files
  as a lightweight data store.

## 2. Architecture

```
Browser (React) --fetch--> Express API --axios--> External Weather Provider
                                |
                                └── local JSON files (favorites / cache / history)
```

_Fill in a more detailed diagram or description once the API integration is in place._

## 3. API Reference (backend)

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | `/api/health` | Health check | ✅ |
| GET | `/api/weather/current?city=` | Current weather for a city | 🔲 stub data |
| GET | `/api/weather/forecast?city=` | 5-day forecast for a city | 🔲 stub data |
| GET | `/api/weather/history` | Recently searched cities | 🔲 stub data |
| GET | `/api/favorites` | List saved favorite cities | ✅ |
| POST | `/api/favorites` | Add a favorite (`{ "city": "London" }`) | ✅ |
| DELETE | `/api/favorites/:city` | Remove a favorite | ✅ |

_Update the "Status" column and add request/response examples as endpoints are finalized._

## 4. Frontend Components

| Component | Responsibility | Status |
|---|---|---|
| `Header` | App title/branding | ✅ static |
| `SearchBar` | Captures city input, calls `onSearch` | ✅ |
| `WeatherCard` | Displays current weather for selected city | 🔲 needs real data |
| `ForecastCard` | Displays 5-day forecast | 🔲 needs real data |
| `Favorites` | Lists & selects saved cities | 🔲 needs backend wiring |

## 5. Choosing a weather provider

Not yet decided. Options to evaluate: OpenWeatherMap, WeatherAPI.com, Tomorrow.io.
Whoever picks this up should document here:
- Which provider was chosen and why
- Rate limits / free tier constraints
- Required API key setup (added to `backend/.env`)

## 6. Deployment

_To be filled in by whoever handles deployment — hosting choice (e.g. Render,
Railway, Vercel + a Node host), build steps, environment variables needed in
production, CI/CD if any._

## 7. Open questions / decisions log

- [ ] Which weather API provider?
- [ ] Units: metric vs imperial vs user toggle?
- [ ] How are favorites persisted long-term (JSON file is fine for local dev —
      is a real DB needed for production)?
- [ ] Caching strategy for repeated city lookups?
