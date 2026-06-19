import { useState } from 'react';

// TODO (Teammate - frontend interactivity): consider debounced
// autocomplete suggestions here once a real API is wired up.
function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-bar__input"
        aria-label="City name"
      />
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
