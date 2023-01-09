<template>
	<div :class="classObj" class="app-wrapper">
		<Sidebar class="sidebar-container" :is-collapse="!sidebar.opened" />
		<div class="main-container">
			<div class="fixed-header">
				<Navbar />
				<Breadcrumb class="breadcrumb-container" />
			</div>
			<AppMain />
		</div>
	</div>
</template>

<script setup lang="ts" name="layout">
import { getActivePinia, storeToRefs } from "pinia";
import { computed } from "vue";

import AppMain from "./AppMain";
import Breadcrumb from "./Breadcrumb/index.vue";
import Navbar from "./Navbar/index.vue";
import Sidebar from "./Sidebar/index.vue";

const activePinia = getActivePinia() as any;
const appStore = activePinia?._s.get("app");
const { sidebar } = storeToRefs(appStore);

const classObj = computed(() => ({
	hideSidebar: !sidebar.value.opened,
	openSidebar: sidebar.value.opened,
	withoutAnimation: sidebar.value.withoutAnimation
}));
</script>

<style lang="less">
.app-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
}

.sidebar-container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 1001;
	width: @sideBarWidth;
	height: 100%;
	overflow: hidden;
	font-size: 0px;
	background-color: @sidebarBg;
	transition: width 0.28s;

	// reset element-ui css
	.horizontal-collapse-transition {
		transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
	}

	.scrollbar-wrapper {
		overflow-x: hidden !important;
	}

	.el-scrollbar__bar.is-vertical {
		right: 0px;
	}

	.el-scrollbar {
		height: 100%;
		margin-top: 16px;
	}

	&.has-logo {
		.el-scrollbar {
			height: 100%;
		}
	}

	.is-horizontal {
		display: none;
	}

	.svg-icon {
		width: 20px !important;
		height: 20px !important;
		margin-right: 10px;
		color: @menuText;
		vertical-align: -4px !important;
	}

	.sub-el-icon {
		margin-right: 12px;
		margin-left: -2px;
	}

	.el-menu {
		width: 100% !important;
		height: 100%;
		background-color: @sidebarBg;
		border: none;
	}

	// menu hover
	.submenu-title-noDropdown,
	.el-sub-menu__title {
		color: @menuText;
		transition: all ease 0.3s;

		&:hover {
			color: @menuActiveText;
			background-color: @menuHover;
		}
		&:focus {
			background-color: transparent;
		}
	}

	.el-menu-item {
		display: block !important;
		height: 51px;
		font-size: 16px;
		.svg-icon {
			color: @menuText;
			transition: all ease 0.3s;
		}

		&.is-active {
			color: @menuActiveText;
			background-color: @menuHover;

			.svg-icon {
				color: @menuActiveText;
			}
		}
	}

	& .nest-menu .el-sub-menu > .el-sub-menu__title,
	& .el-sub-menu .el-menu-item {
		min-width: @sideBarWidth !important;

		&:hover {
			background: @subMenuHover !important;
		}
	}

	.el-sub-menu__title {
		display: block;
		height: 51px;
		font-size: 16px;
		line-height: 51px;
	}

	& .nest-menu .el-menu-item {
		height: 51px;
		padding-left: 70px !important;
		color: @menuText;
		line-height: 51px;
		transition: all ease 0.3s;

		&:hover {
			color: @menuActiveText;
			background-color: @menuHover;
		}
	}

	& .nest-menu .is-active {
		color: @menuActiveText;
		background: @menuHover !important;
	}
}

.hideSidebar {
	.sidebar-container {
		width: 64px;
	}

	.main-container {
		margin-left: 64px;
	}

	.submenu-title-noDropdown {
		position: relative;
		padding: 0 !important;
		.el-tooltip__trigger {
			display: inline-block !important;
			padding: 0 !important;

			.svg-icon {
				margin-left: 20px;
			}

			.sub-el-icon {
				margin-left: 19px;
			}
		}
	}

	.el-sub-menu {
		overflow: hidden;

		& > .el-sub-menu__title {
			padding: 0 !important;

			.svg-icon {
				margin-left: 20px;
			}

			.sub-el-icon {
				margin-left: 19px;
			}

			.el-sub-menu__icon-arrow {
				display: none;
			}
		}
	}

	.el-menu--collapse {
		.el-sub-menu {
			& > .el-sub-menu__title {
				& > span {
					display: inline-block;
					width: 0;
					height: 0;
					overflow: hidden;
					visibility: hidden;
				}
			}
		}
	}
}

.main-container {
	position: relative;
	height: 100%;
	margin-left: @sideBarWidth;
	overflow-x: hidden;
	overflow-y: overlay;
	background-color: @mainContainerBg;
	transition: margin-left 0.28s;
}

.drawer-bg {
	position: absolute;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.3;
}

.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - (@sideBarWidth));
	transition: width 0.28s;
}

.hideSidebar .fixed-header {
	width: calc(100% - 64px);
}

// when menu collapsed
.el-menu--vertical {
	& > .el-menu {
		.svg-icon {
			margin-right: 16px;
		}
		.sub-el-icon {
			margin-right: 12px;
			margin-left: -2px;
		}
	}

	.nest-menu .el-submenu > .el-submenu__title,
	.el-menu-item {
		height: 51px;
		line-height: 51px;
		&:hover {
			color: @menuActiveText !important;
			background-color: @menuHover !important;
		}
	}

	// the scroll bar appears when the subMenu is too long
	> .el-menu--popup {
		max-height: 100vh;
		overflow-y: auto;

		&::-webkit-scrollbar-track-piece {
			background: #d3dce6;
		}

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-thumb {
			background: #99a9bf;
			border-radius: 20px;
		}
	}
}
</style>
