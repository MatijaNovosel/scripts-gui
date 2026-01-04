import vue from "@vitejs/plugin-vue";
import fs from "node:fs";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import pkg from "./package.json";

export default defineConfig(({ command }) => {
  fs.rmSync("dist-electron", { recursive: true, force: true });

  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    base: "./",
    plugins: [
      vue(),
      electron({
        main: {
          entry: "src-electron/electron-main.ts",
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App");
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
              }
            }
          }
        },
        preload: {
          input: "src-electron/electron-preload.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
              }
            }
          }
        }
      })
    ]
  };
});
