<template>
  <div class="nav-bar" :style='style'>
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
    name: 'NavBar',
    props: {
      background: {
        type: String,
        default () {
          return '#ff8198'
        }
      },
      color: {
        type: String,
        default () {
          return '#000'
        }
      }
    },
    computed: {
      backgroundWanted () {
        return `background:${this.background};`
      },
      colorWanted () {
        return `color:${this.color};`
      },
      style () {
        return `background:${this.background}; color:${this.color};`
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
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