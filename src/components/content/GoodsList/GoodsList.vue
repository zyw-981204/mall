<template>
  <div class="goods-list">
    <!--    {{goods}}-->
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: [Array],
        default () {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    width: 94%;
    margin: 0 auto;

  }
</style>