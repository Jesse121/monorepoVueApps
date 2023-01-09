const modules: Record<string, Function> = import.meta.glob("./modules/*.ts", {
	import: "default",
	eager: true
});
const appStore: Record<string, string> = {};

export const registerStore = () => {
	for (const key in modules) {
		const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
		appStore[name] = modules[key]();
	}
};

export default appStore;
