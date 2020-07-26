<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from '@/components/common/gridView/GridView'
  import GoodsListItem from '@/components/content/GoodsList/GoodsListItem'

  export default {
    name: 'TabContentDetail',
    components: {
      GridView,
      GoodsListItem
    },
    created () {
      console.log(this.categoryDetail, '我是categoryDetail')
    },
    props: {
      categoryDetail: {
        type: [Array, Object],
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
