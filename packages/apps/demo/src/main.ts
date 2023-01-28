import "@/styles/index.less";
import "normalize.css/normalize.css";
import "vue-global-api";

import { SvgIcon } from "@vueapps/components";
import { ellipsis } from "@vueapps/directives";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { registerStore } from "./store";

const app = createApp(App);
const pinia = createPinia();
app.component("SvgIcon", SvgIcon);
app.use(router);
app.use(pinia);
app.directive("ellipsis", ellipsis);
// 提前注册pinia状态管理库,方便其他模块直接调用
registerStore();
app.mount("#app");
