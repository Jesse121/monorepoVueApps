import { Layout } from "@vueapps/components";

export default {
  path: "/home",
  component: Layout,
  redirect: "/home/index",
  meta: { title: "首页" },
  children: [
    {
      path: "index",
      name: "home",
      component: () => import("@/views/home/index.vue"),
      meta: { title: "首页", icon: "home", breadcrumb: false },
    },
  ],
};
