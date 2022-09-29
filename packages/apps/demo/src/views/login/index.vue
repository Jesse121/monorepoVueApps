<template>
	<div class="login-container">
		<el-form
			ref="loginFormRef"
			:model="loginForm"
			:rules="loginRules"
			auto-complete="on"
			class="login-form"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">{{ title }}</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="username"
					v-model="loginForm.username"
					auto-complete="on"
					name="username"
					placeholder="请输入用户名"
					tabindex="1"
					type="text"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input
					:key="passwordType"
					ref="passwordRef"
					v-model="loginForm.password"
					:type="passwordType"
					auto-complete="on"
					name="password"
					placeholder="请输入密码"
					tabindex="2"
					@keyup.enter="handleLogin"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>

			<el-button :loading="loading" style="width: 100%; margin-bottom: 30px" type="primary" @click.prevent="handleLogin"
				>登录</el-button
			>
		</el-form>
		<a href="https://beian.miit.gov.cn/" target="_blank" class="beian">备案号：赣ICP备17005701号-8</a>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent, nextTick, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import settings from "@/settings";
import store from "@/store";
import sync from "@/utils/sync";

const validateUsername = (rule: any, value: any, callback: any) => {
	if (!value) {
		callback(new Error("请输入用户名"));
	} else {
		callback();
	}
};
const validatePassword = (rule: any, value: string | any[], callback: any) => {
	if (value.length < 6) {
		callback(new Error("密码不能少于6位"));
	} else {
		callback();
	}
};

const title = ref<string>("");
title.value = settings.title;
const loginForm = reactive({
	username: "",
	password: ""
});
const loginRules = reactive({
	username: [{ required: true, trigger: "blur", validator: validateUsername }],
	password: [{ required: true, trigger: "blur", validator: validatePassword }]
});
const loading = ref<boolean>(false);
const passwordType = ref<string>("password");
const passwordRef = ref();
const loginFormRef = ref();
const router = useRouter();
const route = useRoute();

const showPwd = async () => {
	if (passwordType.value === "password") {
		passwordType.value = "";
	} else {
		passwordType.value = "password";
	}
	await nextTick();
	passwordRef.value.focus();
};

const handleLogin = () => {
	loginFormRef.value.validate(async (valid: boolean) => {
		if (valid) {
			loading.value = true;
			const [err] = await sync(store.dispatch("user/login", loginForm));
			if (err) {
				loading.value = false;
				return false;
			}
			const [err2] = await sync(store.dispatch("user/generateRoutes"));
			if (err2) {
				loading.value = false;
				return false;
			}
			router.replace(route.query.redirect ? decodeURIComponent(route.query.redirect as string) : "/");
			loading.value = false;
		}
	});
};
</script>

<style lang="less" scoped>
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

/* reset element-ui css */
.login-container {
	// @supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
	// 	:deep(.el-input) {
	// 		input {
	// 			color: @cursor;
	// 		}
	// 	}
	// }

	:deep(.el-input) {
		display: inline-block;
		width: 85%;
		height: 47px;

		input {
			height: 47px;
			padding: 12px 5px 12px 15px;
			color: @light_gray;
			background: transparent;
			border: 0px;
			border-radius: 0px;
			-webkit-appearance: none;
			caret-color: @cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px @bg inset !important;
				-webkit-text-fill-color: @cursor !important;
			}
		}
	}

	:deep(.el-form-item) {
		color: #454545;
		background: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 5px;
	}
	:deep(.beian) {
		position: absolute;
		bottom: 20px;
		left: 50%;
		display: block;
		margin: 10px;
		color: #666;
		transform: translateX(-50%);
	}
}

@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
	width: 100%;
	min-height: 100%;
	overflow: hidden;
	background-color: @bg;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		margin-bottom: 10px;
		font-size: 14px;
		color: #fff;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		display: inline-block;
		width: 30px;
		padding: 6px 5px 6px 15px;
		color: @dark_gray;
		vertical-align: middle;
	}

	.title-container {
		position: relative;

		.title {
			margin: 0px auto 40px;
			font-size: 30px;
			font-weight: bold;
			color: @light_gray;
			text-align: center;
		}
	}

	.show-pwd {
		position: absolute;
		top: 7px;
		right: 10px;
		font-size: 16px;
		color: @dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
