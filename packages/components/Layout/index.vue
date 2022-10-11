<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" :is-collapse="!sidebar.opened" />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
        <!-- <tags-view /> -->
      </div>
      <!-- <app-main /> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
import { computed, onMounted, reactive, ref, ToRefs } from "vue";
import useAppStore from "@vueapps/store";

// import AppMain from "./AppMain";
import Navbar from "./Navbar/index.vue";
import Sidebar from "./Sidebar/index.vue";
import { storeToRefs } from "pinia";
// import TagsView from "./TagsView/index.vue";
const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
}));
</script>

<style lang="less" scoped>
.app-wrapper {
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
  width: @sideBarWidth;
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

.hideSidebar {
  .sidebar-container {
    width: 64px;
  }

  .main-container {
    margin-left: 64px;
  }

  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }
    }
  }

  .el-submenu {
    overflow: hidden;

    & > .el-submenu__title {
      padding: 0 !important;

      .svg-icon {
        margin-left: 20px;
      }

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          display: inline-block;
          overflow: hidden;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
    }
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: @sideBarWidth;
  background-color: @mainContainerBg;
  overflow-x: hidden;
  overflow-y: overlay;
  transition: margin-left 0.28s;
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
