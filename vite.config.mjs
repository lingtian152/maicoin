// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { visualizer } from 'rollup-plugin-visualizer'; // Bundle analysis plugin
import compression from 'vite-plugin-compression'; // Gzip compression

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
      ssr: true, // Add SSR compatibility for future expansion
    }),
    Components(),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900', // Specify weights only
          },
        ],
        preconnect: true, // Preload fonts for faster initial rendering
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          vuetify: ['useTheme'], // Limit Vuetify imports to what's necessary
        },
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    visualizer({ open: true }), // Visualize bundle to detect large imports
    compression({ algorithm: 'gzip' }), // Enable gzip compression for assets
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 7008,
    hmr: true, // Enable hot module replacement for faster development
    cacheDir: './.vite', // Cache Vite files for faster rebuilds
  },
  build: {
    sourcemap: false, // Disable source maps for production (optional)
    chunkSizeWarningLimit: 500, // Increase chunk size limit to avoid warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
