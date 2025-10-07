import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    })
  ],
  define: {
    "process.env": {} // fix lỗi process is not defined
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "MyVueLib",
      fileName: (format) => `my-vue-lib.${format}.js`,
      formats: ["umd", "iife"] // build cả 2 format
    },
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});