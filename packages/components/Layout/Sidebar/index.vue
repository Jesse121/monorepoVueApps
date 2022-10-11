<template>
  <div :class="{ 'has-logo': true }">
    <Logo :collapse="isCollapse" />
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="styleVariables.sidebarBg"
        :text-color="styleVariables.menuText"
        unique-opened
        :active-text-color="styleVariables.menuActiveText"
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
    </el-scrollbar> -->
  </div>
</template>

<script setup lang="ts" name="sidebar">
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
// import router, { asyncRoutes } from "@/router";

import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";

const router = useRouter();
const styleVariables = inject("styleVariables", {
  menuText: "",
  menuActiveText: "",
  sidebarBg: "",
});

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
    /**
     * 是否折叠
     */
    isCollapse: boolean;
  }>(),
  {
    isCollapse: false,
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
