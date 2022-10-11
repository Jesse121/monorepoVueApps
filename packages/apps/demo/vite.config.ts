import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { svgBuilder } from "./svgBuilder";
// import { svgBuilder } from "@vueapps/utils";
// console.log(svgBuilder);

const resolve = (dir: string) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    vueJsx(),
    [svgBuilder("./src/assets/icons/")],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(resolve("./src/store/index.ts"))) {
            return "vendor";
          }
        },
      },
    },
  },
});
