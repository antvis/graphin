import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './docs',
  server: {
    port: 8002,
    open: '/',
  },
  build: { outDir: '../' },
  plugins: [react()],
  resolve: {
    alias: {
      '@antv/gi-sdk': join(__dirname, '../gi-sdk/src'),
      '@antv/gi-core-assets': join(__dirname, './src'),
    },
  },
});
