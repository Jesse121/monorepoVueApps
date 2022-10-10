<template>
	<el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
		<slot />
	</el-scrollbar>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";

const tagAndTagSpacing = 4; // tagAndTagSpacing

const left = ref<number>(0);
const scrollContainer = ref();
const scrollWrapper = computed(() => {
	return scrollContainer.value?.wrap;
});
const emit = defineEmits(["scroll"]);
const emitScroll = () => {
	emit("scroll");
};

const handleScroll = e => {
	const eventDelta = e.wheelDelta || -e.deltaY * 40;
	const $scrollWrapper = scrollWrapper.value;
	$scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
};

const moveToTarget = currentTag => {
	const $container = this.$refs.scrollContainer.$el;
	const $containerWidth = $container.offsetWidth;
	const $scrollWrapper = this.scrollWrapper;
	const tagList = this.$parent.tagRefs;

	let firstTag = null;
	let lastTag = null;

	// find first tag and last tag
	if (tagList.length > 0) {
		firstTag = tagList[0];
		lastTag = tagList[tagList.length - 1];
	}

	if (firstTag === currentTag) {
		$scrollWrapper.scrollLeft = 0;
	} else if (lastTag === currentTag) {
		$scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
	} else {
		// find preTag and nextTag
		const currentIndex = tagList.findIndex(item => item === currentTag);
		const prevTag = tagList[currentIndex - 1];
		const nextTag = tagList[currentIndex + 1];

		// the tag's offsetLeft after of nextTag
		const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

		// the tag's offsetLeft before of prevTag
		const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing;

		if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
			$scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
		} else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
			$scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
		}
	}
};

onBeforeMount(() => {
	scrollWrapper.value?.removeEventListener("scroll", emitScroll);
});
onMounted(() => {
	scrollWrapper.value.addEventListener("scroll", emitScroll, true);
});
</script>

<style lang="less" scoped>
.scroll-container {
	position: relative;
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	:deep(.scroll-container) {
		.el-scrollbar__bar {
			bottom: 0px;
		}
		.el-scrollbar__wrap {
			height: 49px;
		}
	}
}
</style>
