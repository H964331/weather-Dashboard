function formatValue(value, suffix) {
  if (value === null || value === undefined) return '--';
  return `${Math.round(value)}${suffix}`;
}

function ForecastCard({ city, error, forecast, isLoading }) {
  if (!city && !isLoading) {
    return (
      <section className="forecast-card forecast-card--empty">
        <p className="forecast-card__eyebrow">Forecast</p>
        <h3 className="forecast-card__title">Forecast cards will appear after you search for a city.</h3>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="forecast-card">
        <div className="forecast-card__header">
          <div>
            <p className="forecast-card__eyebrow">Forecast</p>
            <h3 className="forecast-card__title">Loading forecast data</h3>
          </div>
          <div className="loading-spinner" aria-hidden="true" />
        </div>
        <div className="forecast-grid">
          {[1, 2, 3, 4].map((item) => (
            <article className="forecast-tile forecast-tile--skeleton" key={item}>
              <div className="forecast-card__skeleton forecast-card__skeleton--label" />
              <div className="forecast-card__skeleton forecast-card__skeleton--temp" />
              <div className="forecast-card__skeleton forecast-card__skeleton--line" />
              <div className="forecast-card__skeleton forecast-card__skeleton--line" />
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="forecast-card forecast-card--error" role="alert">
        <p className="forecast-card__eyebrow">Forecast</p>
        <h3 className="forecast-card__title">Forecast data unavailable</h3>
        <p className="forecast-card__copy">{error}</p>
      </section>
    );
  }

  if (!forecast.length) {
    return (
      <section className="forecast-card forecast-card--empty">
        <p className="forecast-card__eyebrow">Forecast</p>
        <h3 className="forecast-card__title">No forecast records are available for {city} yet.</h3>
        <p className="forecast-card__copy">The backend is still returning placeholder data, so this section is ready for real forecast entries when they arrive.</p>
      </section>
    );
  }

  return (
    <section className="forecast-card">
      <div className="forecast-card__header">
        <div>
          <p className="forecast-card__eyebrow">Forecast</p>
          <h3 className="forecast-card__title">Multi-day forecast for {city}</h3>
        </div>
        <p className="forecast-card__copy">Reusable forecast tiles designed for real API data.</p>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <article className="forecast-tile" key={day.id}>
            <p className="forecast-tile__label">{day.label}</p>
            <p className="forecast-tile__condition">{day.condition}</p>
            <p className="forecast-tile__range">
              {formatValue(day.high, '°')} / {formatValue(day.low, '°')}
            </p>
            <div className="forecast-tile__meta">
              <span>Humidity {formatValue(day.humidity, '%')}</span>
              <span>Wind {formatValue(day.windSpeed, ' km/h')}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ForecastCard;
