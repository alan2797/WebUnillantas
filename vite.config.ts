import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: env.VITE_BASE_HREF,
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/tests/setup.ts",
      css: false,
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
      },
    },
  };
});
