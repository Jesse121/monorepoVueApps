import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";

import {
  getToken,
  saveToken,
  saveName,
  getRoutes,
  saveRoutes,
  removeToken,
  getName,
} from "@vueapps/utils";

import setting from "@/setting";
import router, { asyncRoutes } from "@/router";
const { TokenKey, NAME, ROUTE } = setting;

export function getConfigRoutes(
  routes: any[],
  configRouter: any[],
  isChildren?: boolean
) {
  const accessRoutes: Array<RouteRecordRaw> = [];
  configRouter.forEach((m) => {
    const route = routes.find((x) => {
      if (isChildren) {
        return m.path === "/" + x.path;
      } else {
        return m.path === x.path;
      }
    });
    if (!route) return;
    if (route.children && route.children.length > 1) {
      accessRoutes.push({
        ...route,
        meta: {
          ...route.meta,
          title: m.desc,
        },
        children: route.children,
      });
    } else {
      accessRoutes.push({
        ...route,
        meta: {
          ...route.meta,
          title: m.desc,
        },
      });
    }
  });
  return accessRoutes;
}

const useUserStore = defineStore("user", () => {
  const token = computed(() => getToken(TokenKey) || "");
  const name = computed(() => getName(NAME) || "admin");

  /**
   *
   * @param userInfo
   * @returns
   */
  function login(userInfo: { username: string; password: string }) {
    const username = userInfo.username.trim();
    const password = userInfo.password;
    return new Promise<void>((resolve, reject) => {
      loginApi({
        username,
        password,
      })
        .then((res: any) => {
          // console.log(res);
          const { token } = res;
          saveName(NAME, username);
          saveToken(TokenKey, token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  function generateRoutes() {
    return new Promise<void>((resolve, reject) => {
      if (state.routes) return resolve();

      const routes = getRoutes();
      if (routes) {
        // 读取缓存获取路由
        const accessRoutes = getConfigRoutes(asyncRoutes, routes, false);
        accessRoutes.forEach((element) => router.addRoute(element));

        resolve();
      } else {
        // 读取接口获取路由
        getMenuNav()
          .then((res: any) => {
            // console.log(res);
            const accessRoutes = getConfigRoutes(
              asyncRoutes,
              res.result,
              false
            );
            accessRoutes.forEach((element) => router.addRoute(element));

            saveRoutes(res.result);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi({ token: getToken(TokenKey) })
        .then(() => {
          removeToken(TokenKey); // must remove  token  first
          // 退出后默认进首页
          router.push("/");
          // resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return { token, name, login, logout, generateRoutes };
});

export default useUserStore;
