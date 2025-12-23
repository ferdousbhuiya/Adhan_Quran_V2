import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Adhan_Quran_V2/",
  plugins: [react()],
  build: {
    outDir: "dist"
  }
});