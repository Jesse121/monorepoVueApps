<template>
  <div class="error-page-content">
    <!-- <img class="img-404" src="@/assets/404.png" alt="404" /> -->
    <div>
      <p class="bullshit__info">请检查访问链接是否正确，或者点击回首页按钮</p>
      <el-button type="primary" @click="">回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import router from "@/router";
// const goBack = () => {
//   router.push("/");
// };
</script>

<style scoped lang="less">
.error-page-content {
  width: 1200px;
  margin: 30px auto;
  text-align: center;
  .img-404 {
    width: 500px;
    margin-bottom: 30px;
  }
}
</style>
