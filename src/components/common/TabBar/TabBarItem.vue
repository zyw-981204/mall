<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon">
      <div v-show="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-show="isActive">
        <slot name="item-active-icon"></slot>
      </div>
    </div>
    <div class="item-text" :style="isActiveColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      link: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data () {
      return {}
    },
    methods: {
      itemClick () {
        this.$router.push(this.link)
      }
    },
    computed: {
      isActive () {
        // console.log(this.$route.path)
        return this.$route.path.indexOf(this.link) !== -1
      },
      isActiveColor () {
        return this.isActive ? { color: this.activeColor } : {}
        // 判断是否是激活状态 如果是激活状态 就把颜色传入
      }
    }
  }
</script>

<style scoped>
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
</style>