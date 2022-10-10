import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve("./src/styles/base.less")}";`,
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "./src/styles/variables.less"
          )}"`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
