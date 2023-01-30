import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import Hello from "../../Hello/index.vue";
describe("Hello", () => {
	test("挂载组件", async () => {
		expect(Hello).toBeTruthy();

		const wrapper = mount(Hello, {
			props: {
				count: 4
			}
		});

		// expect(wrapper.text()).toContain("4 x 2 = 8");
		// expect(wrapper.html()).toMatchSnapshot();

		await wrapper.get("button").trigger("click");

		expect(wrapper.text()).toContain("4 x 3 = 12");

		await wrapper.get("button").trigger("click");

		expect(wrapper.text()).toContain("4 x 4 = 16");
	});
});
