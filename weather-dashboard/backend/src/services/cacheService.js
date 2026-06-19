// Simple in-memory TTL cache. Good enough for local dev; swap for Redis
// or similar if this needs to survive server restarts / scale horizontally.

const store = new Map();
const TTL_MS = Number(process.env.CACHE_TTL_MINUTES || 10) * 60 * 1000;

export const get = (key) => {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL_MS) {
    store.delete(key);
    return null;
  }
  return entry.value;
};

export const set = (key, value) => {
  store.set(key, { value, timestamp: Date.now() });
};

export const clear = () => store.clear();
