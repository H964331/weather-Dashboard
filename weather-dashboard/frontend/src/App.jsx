import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import ForecastCard from './components/ForecastCard.jsx';
import Favorites from './components/Favorites.jsx';

function App() {
  const [city, setCity] = useState(null);

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <SearchBar onSearch={setCity} />
        <Favorites onSelect={setCity} />
        <div className="app__results">
          <WeatherCard city={city} />
          <ForecastCard city={city} />
        </div>
      </main>
    </div>
  );
}

export default App;
