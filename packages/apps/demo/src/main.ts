import "@/styles/index.less";
import "normalize.css/normalize.css";
import { SvgIcon } from "@vueapps/components";
import "vue-global-api";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, getActivePinia } from "pinia";
import { registerStore } from "./store";

const app = createApp(App);
const pinia = createPinia();
app.component("SvgIcon", SvgIcon);
app.use(router);
app.use(pinia);
// 提前注册pinia状态管理库,方便其他模块直接调用
registerStore();
// console.log(getActivePinia());
app.mount("#app");
