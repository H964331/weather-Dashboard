import { useState } from 'react';

// TODO (Teammate - frontend interactivity): load favorites from
// services/weatherApi.js's getFavorites() on mount, and call addFavorite()
// when the user saves the currently viewed city.
function Favorites({ onSelect }) {
  const [favorites] = useState([]);

  if (favorites.length === 0) {
    return <div className="favorites favorites--empty">No favorite cities yet.</div>;
  }

  return (
    <div className="favorites">
      {favorites.map((city) => (
        <button key={city} className="favorites__chip" onClick={() => onSelect(city)}>
          {city}
        </button>
      ))}
    </div>
  );
}

export default Favorites;
