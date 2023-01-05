import { Layout } from "@vueapps/components";

export default {
	path: "/test",
	component: Layout,
	redirect: "/test/index",
	meta: { title: "测试" },
	children: [
		{
			path: "index",
			name: "test",
			component: () => import("@/views/test/index.vue"),
			meta: { title: "测试", icon: "user", breadcrumb: false }
		}
	]
};
