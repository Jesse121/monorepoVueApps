import { Layout } from "@vueapps/components";

export default {
	path: "/test",
	component: Layout,
	redirect: "noRedirect",
	meta: { title: "测试", icon: "user" },
	children: [
		{
			path: "index",
			name: "test",
			component: () => import("@/views/test/index.vue"),
			meta: { title: "测试1", breadcrumb: false }
		},
		{
			path: "form",
			name: "testForm",
			component: () => import("@/views/test/form.vue"),
			meta: { title: "测试2", breadcrumb: false }
		}
	]
};
