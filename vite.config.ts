import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-export',
    rollupOptions: {
      output: {
        entryFileNames: 'design.js',
        chunkFileNames: 'design.js',
        assetFileNames: 'design.css',
      },
    },
    minify: false,
    cssCodeSplit: false,
  },
});
