<template>
	<div v-if="!item.meta?.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
				(!onlyOneChild.children.length || onlyOneChild.noShowingChildren) &&
				!item.meta?.alwaysShow
			"
		>
			<AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
					<svg-icon v-if="onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon" />
					<template #title>
						{{ onlyOneChild.meta.title }}
					</template>
				</el-menu-item>
			</AppLink>
		</template>

		<el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
			<template #title>
				<Item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
			</template>
			<SidebarItem
				v-for="child in item.children"
				:key="child.path"
				:is-nest="true"
				:item="child"
				:base-path="resolvePath(child.path)"
				class="nest-menu"
			/>
		</el-sub-menu>
	</div>
</template>

<script setup lang="ts">
import { isExternal } from "@vueapps/utils";
import path from "path-browserify";
import { reactive } from "vue";

import Item from "./Item";
import AppLink from "./Link.vue";

const props = defineProps({
	// route object
	item: {
		type: Object,
		required: true
	},
	isNest: {
		type: Boolean,
		default: false
	},
	basePath: {
		type: String,
		default: ""
	}
});

const onlyOneChild = reactive({
	meta: {
		icon: "",
		title: ""
	},
	path: "",
	children: [],
	noShowingChildren: false
});

const hasOneShowingChild = (children = [], parent: any) => {
	const showingChildren = children.filter((item: any) => {
		if (item.meta.hidden) {
			return false;
		} else {
			// Temp set(will be used if only has one showing child)
			Object.assign(onlyOneChild, item);
			return true;
		}
	});

	// When there is only one child router, the child router is displayed by default
	if (showingChildren.length === 1) {
		return true;
	}

	// Show parent if there are no child router to display
	if (showingChildren.length === 0) {
		Object.assign(onlyOneChild, {
			...parent,
			path: "",
			noShowingChildren: true
		});
		return true;
	}
	return false;
};
const resolvePath = (routePath: string) => {
	if (isExternal(routePath)) {
		return routePath;
	}
	if (isExternal(props.basePath)) {
		return props.basePath;
	}
	return path.resolve(props.basePath, routePath);
};
</script>
