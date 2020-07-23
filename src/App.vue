<template>
  <div id="app">
    <keep-alive exclude="Details">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if="isShow"></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    },
    data () {
      return {
        isShow: true
      }
    },
    watch: {
      $route: function f () {
        if (this.$route.path.indexOf('details') !== -1) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }
  }

</script>


<style>
  @import "assets/css/base.css";
</style>
