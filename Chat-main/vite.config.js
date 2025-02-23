import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "chatApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Chat": "./src/Chat.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
  ],
  server: {
    port: 3001,
    strictPort: true,
    hmr:true
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    hmr:true
  },
  preview: {
    port: 3001,
    hmr:true
  },
});
