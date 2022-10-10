import { RouteRecordRaw } from "vue-router";

import localStorage from "./localStorage";

export function getToken(TokenKey: string) {
  return localStorage.getItem(TokenKey);
}

export function saveToken(TokenKey: string, token: string) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken(TokenKey: string) {
  return localStorage.removeItem(TokenKey);
}

export function getName(NAME: string) {
  return localStorage.getItem(NAME);
}
export function saveName(NAME: string, name: string) {
  return localStorage.setItem(NAME, name);
}

export function getRoutes(ROUTE: string) {
  return localStorage.getItem(ROUTE);
}

export function saveRoutes(ROUTE: string, routes: RouteRecordRaw[]) {
  return localStorage.setItem(ROUTE, routes);
}

// export function removeState() {
//   localStorage.removeItem(NAME);
//   localStorage.removeItem(ROUTE);
// }
