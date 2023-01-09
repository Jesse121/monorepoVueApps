import { localStorage } from "@vueapps/utils";
import { defineStore } from "pinia";
import { reactive } from "vue";

const useAppStore = defineStore("app", () => {
	const sidebar = reactive({
		opened: localStorage.getItem("sidebarStatus") ? !!localStorage.getItem("sidebarStatus") : true,
		withoutAnimation: false
	});
	function toggleSideBar() {
		sidebar.opened = !sidebar.opened;
		sidebar.withoutAnimation = false;
		if (sidebar.opened) {
			localStorage.setItem("sidebarStatus", "1");
		} else {
			localStorage.setItem("sidebarStatus", "0");
		}
	}

	return { sidebar, toggleSideBar };
});

export default useAppStore;
