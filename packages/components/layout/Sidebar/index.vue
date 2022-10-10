<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.sidebarBg"
        :text-color="variables.menuText"
        unique-opened
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

import router, { asyncRoutes } from "@/router";
import variables from "@/styles/variables.less";

import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";

const getConfigRoutes = inject("getConfigRoutes");

const showLogo = true;
// console.log(variables);

// const routes = computed(() => {
//   let routes = [];
//   if (store.getters.routes) {
//     routes = getConfigRoutes(asyncRoutes, store.getters.routes, false);
//   } else {
//     // TODO 解决热跟新路由
//     routes = router.options.routes;
//   }
//   return routes;
// });

const routes = computed(() => router.options.routes);

const props = withDefaults(
  defineProps<{
    isCollapse: boolean;
  }>(),
  {
    isCollapse: true,
  }
);

const activeMenu = computed(() => {
  const route = router.currentRoute.value;
  const { meta, matched, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return matched.length > 2 ? matched[1].path : path;
});
</script>
