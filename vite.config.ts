import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: true,
      },
      preview: {
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: true,
      },
      publicDir: 'public',
      plugins: [react(), tailwindcss(), yaml()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(import.meta.dirname, 'src'),
        }
      },
      build: {
        // Sourcemaps disabled: Tailwind v4 plugin cannot emit transform sourcemaps
        // and Rolldown warns when sourcemaps are enabled globally.
        sourcemap: false,
        // Ensure all assets are included
        assetsInlineLimit: 0,
        // Optimize output for static hosting
        rollupOptions: {
          output: {
            manualChunks: (id: string) => {
              if (/\/node_modules\/(react|react-dom|react-router-dom)\//.test(id)) {
                return 'vendor';
              }
            },
          },
        },
      },
    };
});
