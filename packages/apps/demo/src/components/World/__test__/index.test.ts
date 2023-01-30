import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

import World from "../index.vue";

describe("World", () => {
	test("renders a message and responds correctly to user input", () => {
		const wrapper = shallowMount(World, {
			props: {
				message: "Hello World",
				username: ""
			}
		});

		// 确认是否渲染了 `message`
		expect(wrapper.find(".message").text()).toEqual("Hello World");

		// 断言渲染了错误信息
		expect(wrapper.find(".error").exists()).toBeTruthy();

		// 更新 `username` 并断言错误信息不再被渲染
		wrapper.setData({ username: "Lachlan" });
		expect(wrapper.find(".error").exists()).toBeFalsy();
	});
});
