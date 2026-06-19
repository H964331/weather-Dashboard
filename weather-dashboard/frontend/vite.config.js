import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward API calls to the backend during local dev so the frontend
      // can just fetch('/api/...') without worrying about CORS or full URLs.
      '/api': 'http://localhost:5000',
    },
  },
});
