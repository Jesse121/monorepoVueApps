<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { isExternal } from "@vueapps/utils";
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});
const external = computed(() => {
  return isExternal(props.iconClass);
});

const iconName = computed(() => `#icon-${props.iconClass}`);

const svgClass = computed(() => {
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});
const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`,
  };
});
</script>

<style scoped lang="less">
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
