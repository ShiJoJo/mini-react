import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "createElement2",
  },
  test: {
    globals: true,
  },
});
