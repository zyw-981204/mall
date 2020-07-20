<template>
  <div id="profile">
    我是profile
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data () {
      return {
      }
    }
  }
</script>

<style>
  #tab-bar-item {
    flex: 1;
  }

  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }

  .isActive {
    color: red;
  }
</style>
