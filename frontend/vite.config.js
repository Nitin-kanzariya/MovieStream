import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:3000",
    },
  },
});




// import { defineConfig } from 'vite';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000', // Backend URL
//         changeOrigin: true, // Ensures proper handling of host headers
//         secure: false, // Allows self-signed certificates (optional)
//         rewrite: (path) => path.replace(/^\/api/, '') // Remove the /api prefix before forwarding
//       }
//     }
//   }
// });
