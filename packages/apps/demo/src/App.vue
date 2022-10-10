<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import locale from "element-plus/lib/locale/lang/zh-cn";
import settings from "@/setting";
import { getConfigRoutes } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";
import logo from "@/assets/logo.png";
provide("logo", logo);
const title = ref(settings.title);
provide("title", title);
provide("getConfigRoutes", getConfigRoutes);

const appStore = useAppStore();
provide("appStore", appStore);
</script>
