import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sunset-boat/",
  plugins: [react()],
  assetsInclude: ["**/*.gltf", "**/*.hdr", "**/*.glb"],
});
