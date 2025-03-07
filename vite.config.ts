import { defineConfig, Plugin } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
const cleanSourceMap = (v: boolean) => {
  return {
    name: "cleanSourceMap",
    enforce: "post",
    transform(code: string) {
      if (v) {
        return code.replace("# sourceMappingURL=", "");
      }
    },
  } as Plugin;
};
export default defineConfig({
  build: {
    sourcemap: "hidden",
  },
  server: {
    proxy: {
      "^/(trace-platform|trace|tag-image)": {
        target: "http://192.168.10.208",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vueJsx(),
    cleanSourceMap(true),
    AutoImport({
      imports: ["vue"],
      dts: true,
    }),
    Vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            if (tag === "g-dom") return false;
            if (tag.startsWith("g-")) return true;
          },
        },
      },
    }),
  ],
});
