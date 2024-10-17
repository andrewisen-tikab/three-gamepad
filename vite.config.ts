import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "three-gamepad",
      // the proper extensions will be added
      fileName: "three-gamepad",
    },
    rollupOptions: {
      external: ["three"],
      output: {
        globals: {
          vue: "three",
        },
      },
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});
