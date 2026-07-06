import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  // Cloudflare Pages automatically provides this environment variable.
  const isCloudflare = process.env.CF_PAGES === "1";

  return {
    base: isCloudflare ? "/" : "/Orqelix-portfolio/",
    plugins: [
      react(),
      tailwindcss(),
    ],
  };
});