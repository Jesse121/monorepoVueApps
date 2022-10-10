<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import locale from "element-plus/lib/locale/lang/zh-cn";
import settings from "@/setting";
import logo from "@/assets/logo.png";
import styleVariables from "@/styles/variables.less";

provide("logo", logo);
provide("settings", settings);
provide("styleVariables", styleVariables);
</script>
