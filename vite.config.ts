import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // "devstream/aurelia": path.resolve(__dirname, "./src"),
      "devstream/aurelia/app": path.resolve(__dirname, "./src/app"),
      "devstream/aurelia/lib": path.resolve(__dirname, "./src/lib"),
      "devstream/aurelia/store": path.resolve(__dirname, "./src/store"),
      "devstream/aurelia/types": path.resolve(__dirname, "./src/types"),
      "devstream/aurelia/hooks": path.resolve(__dirname, "./src/hooks"),
      "devstream/aurelia/utils": path.resolve(__dirname, "./src/utils"),
      "devstream/aurelia/assets": path.resolve(__dirname, "./src/assets"),
      "devstream/aurelia/features": path.resolve(__dirname, "./src/features"),
      "devstream/aurelia/components": path.resolve(__dirname, "./src/components"),
      "devstream/aurelia/pages": path.resolve(__dirname, "./src/app/pages"),
      "devstream/aurelia/routes": path.resolve(__dirname, "./src/app/pages/routes"),
    },
  },
  plugins: [react()],
});
