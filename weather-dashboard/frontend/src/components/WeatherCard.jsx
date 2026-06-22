function formatMetric(value, suffix = '') {
  if (value === null || value === undefined) return '--';
  return `${Math.round(value)}${suffix}`;
}

function WeatherCard({
  city,
  error,
  isFavorite,
  isLoading,
  onSaveFavorite,
  saveFavoriteLoading,
  weather,
}) {
  if (!city && !isLoading) {
    return (
      <section className="weather-card weather-card--empty">
        <p className="weather-card__state-icon" aria-hidden="true">
          ⌕
        </p>
        <h3 className="weather-card__state-title">Search for a city to begin</h3>
        <p className="weather-card__state-copy">Current weather details, theme changes, and quick insights will appear here.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="weather-card weather-card--loading" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true" />
        <div className="weather-card__skeleton weather-card__skeleton--title" />
        <div className="weather-card__skeleton weather-card__skeleton--temp" />
        <div className="weather-card__metrics">
          {[1, 2, 3].map((item) => (
            <div className="metric-card metric-card--skeleton" key={item}>
              <div className="weather-card__skeleton weather-card__skeleton--metric-label" />
              <div className="weather-card__skeleton weather-card__skeleton--metric-value" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-card weather-card--error" role="alert">
        <p className="weather-card__state-icon" aria-hidden="true">
          !
        </p>
        <h3 className="weather-card__state-title">Current weather unavailable</h3>
        <p className="weather-card__state-copy">{error}</p>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="weather-card weather-card--empty">
        <h3 className="weather-card__state-title">No weather data yet</h3>
      </section>
    );
  }

  return (
    <section className="weather-card">
      <div className="weather-card__top">
        <div>
          <p className="weather-card__eyebrow">Current Conditions</p>
          <h2 className="weather-card__city">{weather.city}</h2>
          <p className="weather-card__condition">{weather.condition}</p>
        </div>

        <div className="weather-card__visual" aria-hidden="true">
          <span className="weather-card__symbol">{weather.symbol}</span>
        </div>
      </div>

      <div className="weather-card__temperature-row">
        <p className="weather-card__temperature">{formatMetric(weather.temperature, '°')}</p>
        <button
          className="weather-card__favorite"
          disabled={isFavorite || saveFavoriteLoading}
          onClick={onSaveFavorite}
          type="button"
        >
          {isFavorite ? 'Saved to favorites' : saveFavoriteLoading ? 'Saving...' : 'Save city'}
        </button>
      </div>

      <div className="weather-card__metrics">
        <article className="metric-card">
          <p className="metric-card__label">Humidity</p>
          <p className="metric-card__value">{formatMetric(weather.humidity, '%')}</p>
        </article>
        <article className="metric-card">
          <p className="metric-card__label">Pressure</p>
          <p className="metric-card__value">{formatMetric(weather.pressure, ' hPa')}</p>
        </article>
        <article className="metric-card">
          <p className="metric-card__label">Wind Speed</p>
          <p className="metric-card__value">{formatMetric(weather.windSpeed, ' km/h')}</p>
        </article>
      </div>

      {(weather.note || weather.updatedAt) && (
        <div className="weather-card__footnote">
          {weather.note && <p>{weather.note}</p>}
          {weather.updatedAt && <p>Updated: {weather.updatedAt}</p>}
        </div>
      )}
    </section>
  );
}

export default WeatherCard;
