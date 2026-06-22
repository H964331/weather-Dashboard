function formatNumber(value, suffix = '') {
  if (value === null || value === undefined || Number.isNaN(value)) return '--';
  return `${Math.round(value)}${suffix}`;
}

function getHumidityLabel(value) {
  if (value === null || value === undefined) return 'Waiting for humidity data';
  if (value < 35) return 'Dry air';
  if (value <= 65) return 'Comfortable range';
  return 'Humid conditions';
}

function getWindLabel(value) {
  if (value === null || value === undefined) return 'Waiting for wind data';
  if (value < 15) return 'Calm breeze';
  if (value <= 30) return 'Steady wind';
  return 'Strong wind';
}

function AnalyticsPanel({ city, forecast, isLoading, weather }) {
  if (!city && !isLoading) {
    return (
      <section className="analytics-panel analytics-panel--empty">
        <p className="analytics-panel__eyebrow">Analytics</p>
        <h3 className="analytics-panel__title">Search a city to unlock the analytics section.</h3>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="analytics-panel">
        <div className="analytics-panel__header">
          <div>
            <p className="analytics-panel__eyebrow">Analytics</p>
            <h3 className="analytics-panel__title">Building weather insights</h3>
          </div>
          <div className="loading-spinner" aria-hidden="true" />
        </div>
        <div className="analytics-grid">
          {[1, 2, 3].map((item) => (
            <article className="insight-card insight-card--skeleton" key={item}>
              <div className="forecast-card__skeleton forecast-card__skeleton--label" />
              <div className="forecast-card__skeleton forecast-card__skeleton--temp" />
              <div className="forecast-card__skeleton forecast-card__skeleton--line" />
            </article>
          ))}
        </div>
      </section>
    );
  }

  const highs = forecast.map((day) => day.high).filter((value) => value !== null && value !== undefined);
  const lows = forecast.map((day) => day.low).filter((value) => value !== null && value !== undefined);
  const warmest = highs.length ? Math.max(...highs) : null;
  const coolest = lows.length ? Math.min(...lows) : null;
  const averageHigh = highs.length ? highs.reduce((sum, value) => sum + value, 0) / highs.length : null;

  return (
    <section className="analytics-panel">
      <div className="analytics-panel__header">
        <div>
          <p className="analytics-panel__eyebrow">Analytics</p>
          <h3 className="analytics-panel__title">Quick weather insights for {city}</h3>
        </div>
        <p className="analytics-panel__copy">Frontend-only visual analytics that are ready to consume richer backend data later.</p>
      </div>

      <div className="analytics-grid">
        <article className="insight-card">
          <p className="insight-card__label">Atmosphere</p>
          <p className="insight-card__value">{formatNumber(weather?.humidity, '%')}</p>
          <p className="insight-card__copy">{getHumidityLabel(weather?.humidity)}</p>
        </article>

        <article className="insight-card">
          <p className="insight-card__label">Wind Watch</p>
          <p className="insight-card__value">{formatNumber(weather?.windSpeed, ' km/h')}</p>
          <p className="insight-card__copy">{getWindLabel(weather?.windSpeed)}</p>
        </article>

        <article className="insight-card">
          <p className="insight-card__label">Temperature Window</p>
          <p className="insight-card__value">
            {formatNumber(warmest, '°')} / {formatNumber(coolest, '°')}
          </p>
          <p className="insight-card__copy">Highest and lowest values across the loaded forecast set.</p>
        </article>
      </div>

      <div className="trend-card">
        <div className="trend-card__header">
          <h4 className="trend-card__title">Forecast trend preview</h4>
          <p className="trend-card__caption">Average high: {formatNumber(averageHigh, '°')}</p>
        </div>

        {!forecast.length ? (
          <p className="trend-card__empty">Forecast trend bars will appear here when multi-day data is available.</p>
        ) : (
          <div className="trend-bars">
            {forecast.map((day) => (
              <div className="trend-bars__row" key={day.id}>
                <span className="trend-bars__label">{day.label}</span>
                <div className="trend-bars__track">
                  <div className="trend-bars__fill" style={{ width: `${Math.max((day.high ?? 0) * 2, 12)}px` }} />
                </div>
                <span className="trend-bars__value">{formatNumber(day.high, '°')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AnalyticsPanel;
