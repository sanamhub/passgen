import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 4173,
      proxy: {
        '/api': {
          target: 'http://localhost:4174',
          changeOrigin: true,
          secure: false
        },
        '/.netlify/functions/api': {
          target: 'http://localhost:4174',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/.netlify\/functions\/api/, '/api')
        }
      }
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(
      Boolean
    ),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
