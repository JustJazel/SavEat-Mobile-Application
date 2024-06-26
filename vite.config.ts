import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa'; //added for pwa

export default defineConfig({
  plugins: [tsconfigPaths(), vue(), VitePWA({ registerType: 'autoUpdate' }), legacy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  envPrefix: 'VITE_',
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  // },
});
