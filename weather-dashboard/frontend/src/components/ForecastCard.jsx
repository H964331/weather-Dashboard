// TODO (Teammate - frontend interactivity): call services/weatherApi.js's
// getForecast(city) and render a 5-day list instead of this placeholder.
function ForecastCard({ city }) {
  if (!city) return null;

  return (
    <div className="forecast-card">
      <h3 className="forecast-card__title">5-Day Forecast for {city}</h3>
      <p className="forecast-card__placeholder">Forecast data goes here.</p>
    </div>
  );
}

export default ForecastCard;
