const API_BASE = '/api';

// TODO (Teammate - API integration): these already point at the right
// backend routes — no changes needed here unless the route shapes change.

export const getCurrentWeather = async (city) => {
  const res = await fetch(`${API_BASE}/weather/current?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch current weather');
  return res.json();
};

export const getForecast = async (city) => {
  const res = await fetch(`${API_BASE}/weather/forecast?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  return res.json();
};

export const getFavorites = async () => {
  const res = await fetch(`${API_BASE}/favorites`);
  if (!res.ok) throw new Error('Failed to fetch favorites');
  return res.json();
};

export const addFavorite = async (city) => {
  const res = await fetch(`${API_BASE}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city }),
  });
  if (!res.ok) throw new Error('Failed to add favorite');
  return res.json();
};

export const removeFavorite = async (city) => {
  const res = await fetch(`${API_BASE}/favorites/${encodeURIComponent(city)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to remove favorite');
  return res.json();
};
