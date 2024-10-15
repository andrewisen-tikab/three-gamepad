import { resolve } from "path";
import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";

// @ts-ignore
const input = {
  "examples:": resolve(__dirname, `examples/index.html`),
};

export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist/examples",
    rollupOptions: {
      input,
    },
  },
  plugins: [splitVendorChunkPlugin()],
});
