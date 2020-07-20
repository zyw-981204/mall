<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index ===currentIndex }"
         @click='checkInThis(index)'
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabContorl',
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      checkInThis (index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    background: #ffffff;
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    width: 100%;
    font-size: 18px;
  }

  .tab-control-item {
    width: 80px;
    flex: 1;
  }

  .active {
    color: #ff5777;
  }

  .active span {
    padding: 5px;
    color: #ff5777;
    border-bottom: 3px solid #ff5777;
  }
</style>