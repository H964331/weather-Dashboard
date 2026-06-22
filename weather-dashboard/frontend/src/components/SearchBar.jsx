import { useEffect, useState } from 'react';

function SearchBar({ city, isLoading, onSearch }) {
  const [value, setValue] = useState(city);

  useEffect(() => {
    setValue(city);
  }, [city]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-bar__label" htmlFor="city-search">
        Search city
      </label>
      <div className="search-bar__controls">
        <input
          id="city-search"
          type="text"
          placeholder="Try London, Chennai, Tokyo..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="search-bar__input"
          aria-label="City name"
        />
        <button type="submit" className="search-bar__button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
