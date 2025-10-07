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
      // ⚠️ Dùng file UMD entry riêng, KHÔNG phải main.js
      entry: path.resolve(__dirname, "src/umd-entry.js"),
      name: "MyVueLib",
      fileName: (format) => `my-vue-lib.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: { vue: "Vue" },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
