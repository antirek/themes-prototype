import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Vite автоматически использует sass-embedded если он установлен
      }
    }
  },
  build: {
    outDir: 'dist/themes',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'light': resolve(__dirname, 'src/themes/light/index.scss'),
        'dark': resolve(__dirname, 'src/themes/dark/index.scss'),
        'green': resolve(__dirname, 'src/themes/green/index.scss'),
        'starwars': resolve(__dirname, 'src/themes/starwars/index.scss'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].css';
          }
          return '[name].[ext]';
        }
      }
    }
  }
});
