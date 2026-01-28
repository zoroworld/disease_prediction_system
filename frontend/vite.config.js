import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    host: true, // Necessary for Docker to map the port externally
    port: 5173, // Ensure this matches your Dockerfile/Compose EXPOSE ports
    watch: {
      usePolling: true, // Enables hot reload in Docker/WSL environments
    },
  },
});
