import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ajuste `base` para o nome exato do seu repo no GitHub (com barras)
export default defineConfig({
  base: "/MVPemFormadeReact/",
  plugins: [react()],
});