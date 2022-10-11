import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// import home from "./modules/home";

import { Layout, ErrorPage, NormalLogin } from "@vueapps/components";
/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/redirect", //用于tagsView中刷新
  //   component: Layout,
  //   meta: {
  //     hidden: true,
  //   },
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       component: () => import("@/views/redirect/index.vue"),
  //     },
  //   ],
  // },
  {
    path: "/login",
    component: NormalLogin,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: ErrorPage,
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layout,
    // redirect: "/home/index",
    meta: {
      title: "首页",
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: { hidden: true },
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: Array<RouteRecordRaw> = [];

// 开发路由 - 仅本地开发环境可用
let devRoutes: RouteRecordRaw[] = [];

export let devPagesRoutes: RouteRecordRaw[] = [];

if (process.env.NODE_ENV === "development") {
  devPagesRoutes = [...asyncRoutes];
  devRoutes = devRoutes.concat(devPagesRoutes);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...devRoutes],
});

export default router;
