<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="item in levelList" :key="item.path">
				<span>{{ item.meta.title }} </span>
				<!-- <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
					item.meta.title
				}}</span>
				<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script setup lang="ts">
// import { compile } from "path-to-regexp";
import { ref, watch } from "vue";
import { RouteLocationMatched } from "vue-router";

import router from "@/router";

const levelList = ref<RouteLocationMatched[]>([]);

watch(router.currentRoute, () => {
	getBreadcrumb();
});

const getBreadcrumb = () => {
	// only show routes with meta.title
	const matched = router.currentRoute.value.matched.filter(item => item.meta && item.meta.title);

	// const first = matched[0];
	// if (!this.isDashboard(first)) {
	// 	matched = [].concat(matched);
	// }

	levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
};
getBreadcrumb();
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 56px;

	a {
		color: #666;
	}

	.no-redirect {
		color: #b2b2b2;
		cursor: text;
	}

	:deep(.el-breadcrumb__separator) {
		color: #666;
	}
}
</style>
