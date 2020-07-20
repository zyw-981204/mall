<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped>
  .nav-bar {
    background: #ff8198;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    height: 49px;
    line-height: 49px;
    text-align: center;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
    color: #fff;
    font-size: 18px;
  }
</style>