<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" alt="" class="top">
  </div>
</template>

<script>
  export default {
    name: 'ToTop'
  }
</script>

<style scoped>
  .top {
    position: fixed;
    right: 0;
    bottom: 55px;
    z-index: 999;
  }
</style>