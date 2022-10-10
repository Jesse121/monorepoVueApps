<template>
	<div id="tags-view-container" class="tags-view-container">
		<scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
			<router-link
				v-for="tag in visitedViews"
				:ref="setTagRef"
				:key="tag.path"
				:class="isActive(tag) ? 'active' : ''"
				:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
				tag="span"
				class="tags-view-item"
				@click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
				@contextmenu.prevent="openMenu(tag, $event)"
			>
				{{ tag.title }}
				<span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
			</router-link>
		</scroll-pane>
		<ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
			<li @click="refreshSelectedTag(selectedTag)">刷新</li>
			<li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
			<li @click="closeOthersTags">关闭其他</li>
			<li @click="closeAllTags(selectedTag)">全部关闭</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import path from "path-browserify";
import { computed, nextTick, onBeforeUpdate, onMounted, reactive, ref, watch } from "vue";

import router from "@/router";
import store from "@/store";
import { getRoutes } from "@/utils/auth";

import ScrollPane from "./ScrollPane.vue";

const visible = ref<boolean>(false);
const selectedTag = reactive({});
const affixTags = ref([]);

const visitedViews = computed(() => store.state.tagsView.visitedViews);

const addTags = () => {
	const { path } = router.currentRoute.value;
	if (path && path.indexOf("redirect") < 0) {
		store.dispatch("tagsView/addView", router.currentRoute.value);
	}
	return false;
};

const scrollPaneRef = ref(null);
const tagRefs = reactive([]);
const moveToCurrentTag = () => {
	nextTick(() => {
		for (const tag of tagRefs) {
			if (tag.to.path === router.currentRoute.value.path) {
				scrollPaneRef.value?.moveToTarget(tag);
				// when query is different then update
				if (tag.to.fullPath !== router.currentRoute.value.fullPath) {
					store.dispatch("tagsView/updateVisitedView", router.currentRoute.value);
				}
				break;
			}
		}
	});
};

const closeMenu = () => {
	visible.value = false;
};

const filterAffixTags = (routes, basePath = "/") => {
	let tags = [];
	routes &&
		routes.forEach(route => {
			if (route.meta && route.meta.affix) {
				const tagPath = path.resolve(basePath, route.path);
				tags.push({
					fullPath: tagPath,
					path: tagPath,
					name: route.name,
					meta: { ...route.meta }
				});
			}
			if (route.children) {
				const tempTags = filterAffixTags(route.children, route.path);
				if (tempTags.length >= 1) {
					tags = [...tags, ...tempTags];
				}
			}
		});
	return tags;
};

const initTags = () => {
	const affixTagsArr = (affixTags.value = filterAffixTags(getRoutes()));
	for (const tag of affixTagsArr) {
		// Must have tag name
		if (tag.name) {
			store.dispatch("tagsView/addVisitedView", tag);
		}
	}
};
const toLastView = (visitedViews, view) => {
	const latestView = visitedViews.slice(-1)[0];
	if (latestView) {
		router.push(latestView.fullPath);
	} else {
		// now the default is to redirect to the home page if there is no tags-view,
		// you can adjust it according to your needs.
		if (store.getters.role === "student") {
			// to reload home page
			router.push({ path: "/onlineTrain/home" });
		} else {
			router.push("/");
		}
	}
};
const refreshSelectedTag = view => {
	store.dispatch("tagsView/delCachedView", view).then(() => {
		const { fullPath } = view;
		nextTick(() => {
			router.replace({
				path: "/redirect" + fullPath
			});
		});
	});
};
const isActive = route => {
	return route.path === router.currentRoute.value.path;
};
const closeSelectedTag = view => {
	store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
		if (isActive(view)) {
			toLastView(visitedViews, view);
		}
	});
};
const closeOthersTags = () => {
	router.push(selectedTag);
	store.dispatch("tagsView/delOthersViews", selectedTag).then(() => {
		moveToCurrentTag();
	});
};
const closeAllTags = view => {
	store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
		if (affixTags.value.some(tag => tag.path === view.path)) {
			return;
		}
		toLastView(visitedViews, view);
	});
};

const isAffix = tag => {
	return tag.meta && tag.meta.affix;
};

const setTagRef = el => {
	if (el) tagRefs.push(el);
};

const left = ref<number>(0);
const top = ref<number>(0);

const openMenu = (tag, e) => {
	const menuMinWidth = 105;
	const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
	const offsetWidth = this.$el.offsetWidth; // container width
	const maxLeft = offsetWidth - menuMinWidth; // left boundary
	const leftNum = e.clientX - offsetLeft + 15; // 15: margin right

	if (leftNum > maxLeft) {
		left.value = maxLeft;
	} else {
		left.value = leftNum;
	}

	top.value = e.clientY;
	visible.value = true;
	Object.assign(selectedTag, tag);
};

const handleScroll = () => {
	closeMenu();
};

onBeforeUpdate(() => {
	tagRefs.length = 0;
});
watch(router.currentRoute, () => {
	addTags();
	moveToCurrentTag();
});

watch(visible, val => {
	if (val) {
		document.body.addEventListener("click", closeMenu);
	} else {
		document.body.removeEventListener("click", closeMenu);
	}
});

onMounted(() => {
	initTags();
	addTags();
});
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.tags-view-container {
	width: 100%;
	height: 34px;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	.tags-view-wrapper {
		.tags-view-item {
			position: relative;
			display: inline-block;
			height: 26px;
			padding: 0 8px;
			margin-top: 4px;
			margin-left: 5px;
			font-size: 12px;
			line-height: 26px;
			color: #495060;
			cursor: pointer;
			background: #fff;
			border: 1px solid #d8dce5;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.active {
				color: #fff;
				background-color: @menuHover;
				&::before {
					position: relative;
					display: inline-block;
					width: 8px;
					height: 8px;
					margin-right: 2px;
					content: "";
					background: #fff;
					border-radius: 50%;
				}
			}
		}
	}
	.contextmenu {
		position: absolute;
		z-index: 3000;
		padding: 5px 0;
		margin: 0;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		list-style-type: none;
		background: #fff;
		border-radius: 4px;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			padding: 7px 16px;
			margin: 0;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			text-align: center;
			vertical-align: 2px;
			border-radius: 50%;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				display: inline-block;
				vertical-align: -3px;
				transform: scale(0.6);
			}
			&:hover {
				color: #fff;
				background-color: #b4bccc;
			}
		}
	}
}
</style>
