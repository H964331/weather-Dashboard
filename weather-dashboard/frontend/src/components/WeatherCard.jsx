// TODO (Teammate - frontend interactivity): call services/weatherApi.js's
// getCurrentWeather(city) in a useEffect keyed on `city`, store the result
// in state, and render real fields instead of this placeholder.
function WeatherCard({ city }) {
  if (!city) {
    return (
      <div className="weather-card weather-card--empty">
        Search for a city to see current weather.
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h2 className="weather-card__city">{city}</h2>
      <p className="weather-card__placeholder">Current weather data goes here.</p>
    </div>
  );
}

export default WeatherCard;
