import { acceptHMRUpdate, defineStore } from "pinia";
import { localStorage } from "@vueapps/utils";

const useAppStore = defineStore("app", {
  state: () => ({
    sidebar: {
      opened: localStorage.getItem("sidebarStatus")
        ? !!localStorage.getItem("sidebarStatus")
        : true,
      withoutAnimation: false,
    },
  }),
  getters: {},
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.setItem("sidebarStatus", "1");
      } else {
        localStorage.setItem("sidebarStatus", "0");
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}

export default useAppStore;
