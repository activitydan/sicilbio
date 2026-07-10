import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    preserveSymlinks: true
  },
  server: {
    port: 5173,
    open: false,
    fs: {
      strict: false
    }
  },
  build: {
    target: 'es2020',
    sourcemap: false
  }
});
