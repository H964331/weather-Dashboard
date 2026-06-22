function Favorites({ error, favorites, isLoading, onRemove, onSelect, selectedCity }) {
  return (
    <section className="favorites-panel">
      <div className="favorites-panel__header">
        <div>
          <p className="favorites-panel__eyebrow">Favorites</p>
          <h3 className="favorites-panel__title">Pinned Cities</h3>
        </div>
      </div>

      {isLoading ? (
        <div className="favorites-panel__list">
          {[1, 2, 3].map((item) => (
            <div className="favorites-chip favorites-chip--skeleton" key={item} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="favorites-panel__empty">
          <p>No favorite cities yet. Save a searched city to build a quick-access list.</p>
        </div>
      ) : (
        <div className="favorites-panel__list">
          {favorites.map((city) => (
            <div
              className={`favorites-chip${selectedCity.toLowerCase() === city.toLowerCase() ? ' favorites-chip--active' : ''}`}
              key={city}
            >
              <button className="favorites-chip__select" onClick={() => onSelect(city)} type="button">
                {city}
              </button>
              <button
                aria-label={`Remove ${city} from favorites`}
                className="favorites-chip__remove"
                onClick={() => onRemove(city)}
                type="button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="favorites-panel__error">{error}</p>}
    </section>
  );
}

export default Favorites;
