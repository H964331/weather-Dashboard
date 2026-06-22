import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import ForecastCard from './components/ForecastCard.jsx';
import Favorites from './components/Favorites.jsx';
import AnalyticsPanel from './components/AnalyticsPanel.jsx';
import {
  addFavorite,
  getCurrentWeather,
  getFavorites,
  getForecast,
  removeFavorite,
} from './services/weatherApi.js';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'analytics', label: 'Analytics' },
];

const themeConfig = {
  sunny: { label: 'Sunny Mode' },
  rain: { label: 'Rain Mode' },
  cloudy: { label: 'Cloudy Mode' },
  night: { label: 'Night Mode' },
};

const conditionIcons = {
  sunny: '☀',
  rain: '☂',
  cloudy: '☁',
  night: '☾',
  default: '◌',
};

function pickNumber(...values) {
  for (const value of values) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
  }
  return null;
}

function pickText(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function normalizeCurrentWeather(data, fallbackCity) {
  if (!data) return null;

  const condition = pickText(
    data.condition,
    data.weather?.[0]?.main,
    data.weather?.[0]?.description,
    data.current?.condition?.text,
    data.current?.weather_descriptions?.[0],
  );

  return {
    city: pickText(data.city, data.name, data.location?.name, fallbackCity),
    temperature: pickNumber(
      data.temperature,
      data.temp,
      data.main?.temp,
      data.current?.temp_c,
      data.current?.temperature,
    ),
    humidity: pickNumber(data.humidity, data.main?.humidity, data.current?.humidity),
    pressure: pickNumber(data.pressure, data.main?.pressure, data.current?.pressure_mb),
    windSpeed: pickNumber(
      data.windSpeed,
      data.wind_speed,
      data.wind?.speed,
      data.current?.wind_kph,
    ),
    condition: condition || 'Unknown',
    note: pickText(data.note),
    updatedAt: pickText(data.updatedAt, data.location?.localtime),
  };
}

function normalizeForecastDays(data) {
  if (!data) return [];

  if (Array.isArray(data.days)) {
    return data.days.map((day, index) => ({
      id: `${day.date ?? day.day ?? index}`,
      label: pickText(day.day, day.label, day.date) || `Day ${index + 1}`,
      condition: pickText(day.condition, day.summary, day.weather?.[0]?.main) || 'Unknown',
      high: pickNumber(day.maxTemp, day.high, day.temp?.max, day.temperature?.max),
      low: pickNumber(day.minTemp, day.low, day.temp?.min, day.temperature?.min),
      humidity: pickNumber(day.humidity),
      windSpeed: pickNumber(day.windSpeed, day.wind?.speed),
    }));
  }

  if (Array.isArray(data.forecast?.forecastday)) {
    return data.forecast.forecastday.map((day) => ({
      id: day.date,
      label: day.date,
      condition: pickText(day.day?.condition?.text) || 'Unknown',
      high: pickNumber(day.day?.maxtemp_c),
      low: pickNumber(day.day?.mintemp_c),
      humidity: pickNumber(day.day?.avghumidity),
      windSpeed: pickNumber(day.day?.maxwind_kph),
    }));
  }

  if (!Array.isArray(data.list)) return [];

  const groupedDays = new Map();
  for (const item of data.list) {
    const dateLabel = pickText(item.dt_txt).split(' ')[0];
    if (!dateLabel) continue;

    const bucket = groupedDays.get(dateLabel) ?? [];
    bucket.push(item);
    groupedDays.set(dateLabel, bucket);
  }

  return Array.from(groupedDays.entries())
    .slice(0, 5)
    .map(([dateLabel, items]) => {
      const temperatures = items
        .map((item) => pickNumber(item.main?.temp, item.temp))
        .filter((value) => value !== null);
      const humidities = items
        .map((item) => pickNumber(item.main?.humidity, item.humidity))
        .filter((value) => value !== null);
      const winds = items
        .map((item) => pickNumber(item.wind?.speed, item.windSpeed))
        .filter((value) => value !== null);

      return {
        id: dateLabel,
        label: dateLabel,
        condition: pickText(items[0]?.weather?.[0]?.main, items[0]?.condition) || 'Unknown',
        high: temperatures.length ? Math.max(...temperatures) : null,
        low: temperatures.length ? Math.min(...temperatures) : null,
        humidity: humidities.length
          ? humidities.reduce((sum, value) => sum + value, 0) / humidities.length
          : null,
        windSpeed: winds.length ? Math.max(...winds) : null,
      };
    });
}

function resolveTheme(weather) {
  const condition = pickText(weather?.condition).toLowerCase();
  const hour = new Date().getHours();

  if (condition.includes('rain') || condition.includes('storm') || condition.includes('drizzle')) {
    return 'rain';
  }

  if (condition.includes('cloud') || condition.includes('mist') || condition.includes('fog')) {
    return 'cloudy';
  }

  if (condition.includes('night') || hour < 6 || hour >= 19) {
    return 'night';
  }

  if (condition.includes('clear') || condition.includes('sun')) {
    return 'sunny';
  }

  return 'sunny';
}

function getWeatherSymbol(weather) {
  const theme = resolveTheme(weather);
  return conditionIcons[theme] ?? conditionIcons.default;
}

function formatThemeLabel(theme) {
  return themeConfig[theme]?.label ?? 'Weather Mode';
}

function App() {
  const [city, setCity] = useState('');
  const [searchNonce, setSearchNonce] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [saveFavoriteLoading, setSaveFavoriteLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState('');
  const [weatherError, setWeatherError] = useState('');
  const [forecastError, setForecastError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      try {
        setFavoritesLoading(true);
        setFavoritesError('');
        const data = await getFavorites();
        if (!cancelled) {
          setFavorites(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!cancelled) {
          setFavoritesError(error.message || 'Could not load favorite cities.');
        }
      } finally {
        if (!cancelled) {
          setFavoritesLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!city) {
      setWeather(null);
      setForecast([]);
      setWeatherError('');
      setForecastError('');
      return;
    }

    let cancelled = false;

    async function loadWeatherData() {
      setWeatherLoading(true);
      setForecastLoading(true);
      setWeatherError('');
      setForecastError('');

      const [currentResult, forecastResult] = await Promise.allSettled([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      if (cancelled) return;

      if (currentResult.status === 'fulfilled') {
        setWeather(normalizeCurrentWeather(currentResult.value, city));
      } else {
        setWeather(null);
        setWeatherError(currentResult.reason?.message || 'Could not load current weather.');
      }

      if (forecastResult.status === 'fulfilled') {
        setForecast(normalizeForecastDays(forecastResult.value));
      } else {
        setForecast([]);
        setForecastError(forecastResult.reason?.message || 'Could not load forecast data.');
      }

      setWeatherLoading(false);
      setForecastLoading(false);
    }

    loadWeatherData();

    return () => {
      cancelled = true;
    };
  }, [city, searchNonce]);

  function handleSearch(nextCity) {
    setCity(nextCity);
    setSearchNonce((currentNonce) => currentNonce + 1);
    setActiveSection('overview');
  }

  function handleNavigate(sectionId) {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  async function handleSaveFavorite() {
    if (!city) return;

    try {
      setSaveFavoriteLoading(true);
      setFavoritesError('');
      const data = await addFavorite(city);
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      setFavoritesError(error.message || 'Could not save this city.');
    } finally {
      setSaveFavoriteLoading(false);
    }
  }

  async function handleRemoveFavorite(nextCity) {
    try {
      setFavoritesError('');
      const data = await removeFavorite(nextCity);
      setFavorites(Array.isArray(data) ? data : []);
    } catch (error) {
      setFavoritesError(error.message || 'Could not remove this city.');
    }
  }

  const theme = resolveTheme(weather);
  const favoriteLookup = favorites.map((item) => item.toLowerCase());
  const isFavorite = city ? favoriteLookup.includes(city.toLowerCase()) : false;

  return (
    <div className={`app app--${theme}`}>
      <div className="app__gradient" aria-hidden="true" />
      <Header
        activeSection={activeSection}
        city={weather?.city || city}
        navItems={NAV_ITEMS}
        onNavigate={handleNavigate}
        themeLabel={formatThemeLabel(theme)}
      />

      <main className="dashboard">
        <section className="dashboard__hero" id="overview">
          <div className="dashboard__lead">
            <div className="section-card section-card--intro">
              <p className="section-card__eyebrow">Smart Search</p>
              <h2 className="section-card__title">Track any city with a cleaner, more polished weather workspace.</h2>
              <p className="section-card__copy">
                Search for current conditions, keep favorite cities nearby, and switch through weather-based themes
                automatically as the data changes.
              </p>
              <SearchBar city={city} isLoading={weatherLoading || forecastLoading} onSearch={handleSearch} />
            </div>

            <WeatherCard
              city={city}
              error={weatherError}
              isFavorite={isFavorite}
              isLoading={weatherLoading}
              onSaveFavorite={handleSaveFavorite}
              saveFavoriteLoading={saveFavoriteLoading}
              weather={weather ? { ...weather, symbol: getWeatherSymbol(weather) } : null}
            />
          </div>

          <aside className="dashboard__rail">
            <Favorites
              error={favoritesError}
              favorites={favorites}
              isLoading={favoritesLoading}
              onRemove={handleRemoveFavorite}
              onSelect={handleSearch}
              selectedCity={city}
            />

            <div className="section-card section-card--theme">
              <p className="section-card__eyebrow">Active Theme</p>
              <div className="theme-preview">
                <span className="theme-preview__icon" aria-hidden="true">
                  {getWeatherSymbol(weather)}
                </span>
                <div>
                  <h3 className="theme-preview__title">{formatThemeLabel(theme)}</h3>
                  <p className="theme-preview__copy">
                    Colors adapt for sunny, rainy, cloudy, and night conditions to keep the dashboard readable and
                    expressive.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="dashboard__section" id="forecast">
          <ForecastCard city={city} error={forecastError} forecast={forecast} isLoading={forecastLoading} />
        </section>

        <section className="dashboard__section" id="analytics">
          <AnalyticsPanel
            city={city}
            forecast={forecast}
            isLoading={weatherLoading || forecastLoading}
            weather={weather}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
