import "@/styles/index.less";
import "normalize.css/normalize.css";

import "vue-global-api";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
