import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { glob } from 'glob';

// Находим все Vue компоненты
const components = glob.sync('src/components/**/*.vue');
const componentEntries = components.reduce((entries, component) => {
  const name = component.replace('src/components/', '').replace('.vue', '');
  entries[name] = resolve(__dirname, component);
  return entries;
}, {} as Record<string, string>);

// Находим все темы
const themes = glob.sync('src/themes/**/*.scss');
const themeEntries = themes.reduce((entries, theme) => {
  const name = theme.replace('src/themes/', '').replace('.scss', '');
  entries[name] = resolve(__dirname, theme);
  return entries;
}, {} as Record<string, string>);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TheProCards',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es.js' : 'js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  css: {
    modules: false
  }
});
