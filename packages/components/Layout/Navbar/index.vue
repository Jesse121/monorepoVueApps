<template>
	<div class="navbar">
		<Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<div class="right-menu">
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<div class="nickname">{{ name }}</div>
					<el-icon class="el-icon-caret-bottom"><CaretBottom /></el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<el-dropdown-item v-if="isDev">
							<router-link to="/dev">开发路由</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/password">修改密码</router-link>
						</el-dropdown-item>
						<el-dropdown-item divided @click="logout">
							<span style="display: block">退出</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts" name="navbar">
import { CaretBottom } from "@element-plus/icons-vue";
import { getActivePinia, storeToRefs } from "pinia";

import Hamburger from "../Hamburger/index.vue";
const isDev = import.meta.env.VITE_NODE_ENV;

const activePinia = getActivePinia() as any;
const appStore = activePinia._s.get("app");
const useStore = activePinia._s.get("user");
// console.log(appStore);
// console.log(useStore);

const { sidebar } = storeToRefs(appStore);
const { name } = storeToRefs(useStore);

const toggleSideBar = () => {
	appStore.toggleSideBar();
};
const logout = async () => {
	await useStore.logout();
};
</script>

<style lang="less" scoped>
.navbar {
	position: relative;
	height: 56px;
	overflow: hidden;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		float: left;
		height: 100%;
		line-height: 56px;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		// &:hover {
		// 	background: rgba(0, 0, 0, 0.025);
		// }
	}

	.breadcrumb-container {
		float: left;
	}

	.right-menu {
		float: right;
		height: 100%;
		margin-right: 15px;
		line-height: 56px;

		&:focus {
			outline: none;
		}

		// .right-menu-item {
		// 	display: inline-block;
		// 	padding: 0 8px;
		// 	height: 100%;
		// 	font-size: 18px;
		// 	color: #5a5e66;
		// 	vertical-align: text-bottom;

		// 	&.hover-effect {
		// 		cursor: pointer;
		// 		transition: background 0.3s;

		// 		&:hover {
		// 			background: rgba(0, 0, 0, 0.025);
		// 		}
		// 	}
		// }

		:deep(.avatar-container) {
			margin-right: 30px;
			line-height: inherit;

			.avatar-wrapper {
				position: relative;

				.nickname {
					width: 90px;
					overflow: hidden;
					color: #666;
					// height: 40px;
					font-size: 14px;
					white-space: nowrap;
					text-align: right;
					text-overflow: ellipsis;
					cursor: pointer;
					// border-radius: 10px;
				}

				.el-icon-caret-bottom {
					position: absolute;
					top: 23px;
					right: -20px;
					font-size: 12px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
