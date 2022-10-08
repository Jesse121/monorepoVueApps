<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<breadcrumb class="breadcrumb-container" />

		<div class="right-menu">
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" /> -->
					<div class="nickname">{{ name }}</div>
					<i class="el-icon-caret-bottom" />
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<el-dropdown-item v-if="isDev" @click="$router.push('/dev')">
							<span>开发路由</span>
						</el-dropdown-item>
						<el-dropdown-item v-if="role !== 'student'">
							<router-link to="/setup">个人设置</router-link>
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

<script setup lang="ts">
import store from "@/store";

import Breadcrumb from "../Breadcrumb/index.vue";
import Hamburger from "../Hamburger/index.vue";

const isDev = import.meta.env.DEV;

const { sidebar, name, role } = store.getters;

const toggleSideBar = () => {
	store.dispatch("app/toggleSideBar");
};
const logout = async () => {
	await store.dispatch("user/logout");
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
					// height: 40px;
					font-size: 14px;
					color: #666;
					text-align: right;
					text-overflow: ellipsis;
					white-space: nowrap;
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
