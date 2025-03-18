
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Output directory
    outDir: 'dist',
    // Enable source maps for debugging
    sourcemap: mode !== 'production',
    // Minify output
    minify: 'terser',
    // Configure chunk splitting strategy for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select',
            // Add other UI components as needed
          ],
        }
      }
    },
    // Remove console statements in production
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
      },
    },
  },
}));
