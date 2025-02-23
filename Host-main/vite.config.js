import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "hostApp",
      remotes: {
        chatApp: `http://localhost:3001/assets/remoteEntry.js?version=${Date.now()}`,
        emailApp: `http://localhost:3003/assets/remoteEntry.js?version=${Date.now()}`,
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
  ],
  server: {
    port: 3000,
    hmr:true,
  },
});
