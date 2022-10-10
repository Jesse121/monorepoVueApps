<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" :is-collapse="!opened" />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <!-- <Breadcrumb class="breadcrumb-container" /> -->
        <!-- <tags-view /> -->
      </div>
      <!-- <app-main /> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
import { getActivePinia, storeToRefs } from "pinia";
import { computed, onMounted, reactive, ref, ToRefs } from "vue";

// import AppMain from "./AppMain";
// import Breadcrumb from "./Breadcrumb/index.vue";
import Navbar from "./Navbar/index.vue";
import Sidebar from "./Sidebar/index.vue";
// import TagsView from "./TagsView/index.vue";
const activePinia = reactive(getActivePinia() as any);
const appStore = activePinia._s.get("app");
const opened = ref(appStore.sidebar.opened);
const { withoutAnimation } = appStore.sidebar;
const classObj = computed(() => {
  hideSidebar: !opened;
  openSidebar: opened;
  withoutAnimation: withoutAnimation;
});
</script>

<style lang="less" scoped>
.app-wrapper {
  .clearfix();
  position: relative;
  width: 100%;
  height: 100%;
}

.sidebar-container {
  position: fixed;
  z-index: 1001;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: @sideBarWidth !important;
  height: 100%;
  background-color: @sidebarBg;
  font-size: 0px;
  transition: width 0.28s;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
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

  a {
    display: inline-block;
    overflow: hidden;
    width: 100%;
  }

  .svg-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: @menuText;
    vertical-align: -4px;
  }

  .sub-el-icon {
    margin-right: 12px;
    margin-left: -2px;
  }

  .el-menu {
    width: 100% !important;
    height: 100%;
    border: none;
    background-color: @sidebarBg;
  }

  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    color: @menuText;
    transition: all ease 0.3s;

    &:hover {
      background-color: @menuHover;
      color: @menuActiveText;
    }
    &:focus {
      background-color: transparent;
    }
  }

  .el-menu-item {
    height: 51px;
    font-size: 16px;
    .svg-icon {
      color: @menuText;
      transition: all ease 0.3s;
    }

    &.is-active {
      background-color: @menuHover;
      color: @menuActiveText;

      .svg-icon {
        color: @menuActiveText;
      }
    }
  }

  & .nest-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    min-width: @sideBarWidth !important;

    &:hover {
      background: @subMenuHover !important;
    }
  }

  .el-submenu__title {
    height: 51px;
    line-height: 51px;
  }

  & .nest-menu .el-menu-item {
    height: 51px;
    padding-left: 70px !important;
    color: @menuText;
    line-height: 51px;
    transition: all ease 0.3s;

    &:hover {
      background-color: @menuHover;
      color: @menuActiveText;
    }
  }

  & .nest-menu .is-active {
    background: @menuHover !important;
    color: @menuActiveText;
  }
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
</style>
