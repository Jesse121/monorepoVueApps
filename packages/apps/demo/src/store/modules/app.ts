import { defineStore } from "pinia";
import { localStorage } from "@vueapps/utils";

export const useAppStore = defineStore("app", () => {
  const sidebar = reactive({
    opened: localStorage.getItem("sidebarStatus")
      ? !!localStorage.getItem("sidebarStatus")
      : true,
    withoutAnimation: false,
  });

  return { sidebar };
});
