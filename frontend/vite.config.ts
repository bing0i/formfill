import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/apis/": "http://localhost:3001",
    },
  },
});
