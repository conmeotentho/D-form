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
        assetFileNames: (assetInfo) => {
          if (/\.css$/i.test(assetInfo.name)) return 'assets/[name].[ext]';
          if (/\.(woff2?|ttf|eot|svg)$/i.test(assetInfo.name))
            return 'assets/fonts/[name].[ext]';
          return 'assets/[name].[ext]';
        },
      },
    },
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
