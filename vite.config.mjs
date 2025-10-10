import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/umd-entry.js"),
      name: "AppTree",
      fileName: (format) => `app-tree.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      // ⚠️ Không external Vue -> bundle luôn Vue runtime
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
