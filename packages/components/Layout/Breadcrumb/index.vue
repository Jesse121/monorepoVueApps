<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<span class="current-position">当前位置：</span>
		<el-breadcrumb-item v-for="item in levelList" :key="item.path">
			<span>{{ item.meta.title }} </span>
			<!-- <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
					item.meta.title
				}}</span>
				<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts" name="breadcrumb">
// import { compile } from "path-to-regexp";
import { ref, watch } from "vue";
import { RouteLocationMatched, useRouter } from "vue-router";
const router = useRouter();

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
	margin-left: 24px;
	font-size: 14px;
	line-height: 40px;

	.current-position {
		float: left;
	}

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
