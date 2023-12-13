import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Musicfy",
        short_name: "Musicfy",
        description:
          "Musicfy",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#fff",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
