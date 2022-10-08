<template>
	<component :is="type" v-bind="linkProps(to)">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { isExternal } from "@/utils/validate";

const props = defineProps({
	to: {
		type: String,
		required: true
	}
});

const isExternalRef = computed(() => isExternal(props.to));

const type = computed(() => {
	if (isExternalRef.value) {
		return "a";
	}
	return "router-link";
});

const linkProps = to => {
	if (isExternalRef.value) {
		return {
			href: to,
			target: "_blank",
			rel: "noopener"
		};
	}
	return {
		to: to
	};
};
</script>
