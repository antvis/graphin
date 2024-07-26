import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

export default defineConfig({
  root: './docs',
  server: {
    port: 8001,
    open: '/',
  },
  build: { outDir: '../' },
  plugins: [react()],
  resolve: {
    alias: {
      '@antv/gi-sdk': join(__dirname, './src'),
    },
  },
});
