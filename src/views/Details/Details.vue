<template>
  <div class="details">
    <detail-nav></detail-nav>
    <detail-swiper :banners="topImages"></detail-swiper>
    <detail-show :goods-info="goodsInfo"></detail-show>
  </div>
</template>

<script>
  // 引入组件
  import DetailNav from './childComponents/detailNav'
  import DetailSwiper from './childComponents/detailSwiper'
  import DetailShow from './childComponents/detailShow'
  // 引入方法
  import { getDetails, goodsInfo } from '../../api/details'

  export default {
    name: 'Details',
    components: {
      DetailNav,
      DetailSwiper,
      DetailShow
    },
    data () {
      return {
        iid: {},
        topImages: [],
        goodsInfo: {}
      }
    },
    created () {
      // 获取当前商品的iid
      this.iid = this.$route.params.iid
      getDetails(this.iid).then((res) => {
        let data = res.data.result
        // 获取对应表单需要的数据
        this.topImages = data.itemInfo.topImages
        // 获取轮播图
        this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        // 初始化需要传入的数据
        console.log(data.columns, '我是columns')
      })
    }
  }
</script>

<style scoped>
  .details {

  }

</style>