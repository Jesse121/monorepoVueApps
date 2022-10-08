import "./index.less";

import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "AppMain",
	setup() {
		const router = useRouter();
		const routerViewLength = computed(() => router.currentRoute.value.matched.length);

		function createRouterView(index: number) {
			if (!--index) return;

			return (
				<router-view
					v-slots={{
						default: ({ Component }: any) => (
							<>
								{index === 1 && Component}
								{createRouterView(index)}
							</>
						)
					}}
				/>
			);
		}

		return () => {
			return <section class="app-main">{createRouterView(routerViewLength.value)}</section>;
		};
	}
});
