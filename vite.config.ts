import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sunset-boat/",
  plugins: [react(), basicSsl()],
  assetsInclude: ["**/*.gltf", "**/*.hdr", "**/*.glb"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "controls/index.html"),
      },
    },
  },
});
