<template>
  <div class="details">
    <detail-nav></detail-nav>
    <scroll :pull-up-load='true'
            ref="scroll"
            class="view"
    >
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-show :get-columns="goodsInfo"></detail-show>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  // 引入组件
  import DetailNav from './childComponents/detailNav'
  import DetailSwiper from './childComponents/detailSwiper'
  import DetailShow from './childComponents/detailShow'
  // 引入方法
  import { getDetails, goodsInfo, shop, GoodsParam } from '../../api/details'
  import DetailShopInfo from './childComponents/detailShopInfo'
  import DetailParamInfo from './childComponents/detailParamInfo'
  import DetailGoodsInfo from './childComponents/detailGoodsInfo'
  import Scroll from '../../components/common/Scroll/Scroll'

  export default {
    name: 'Details',
    components: {
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailShopInfo,
      DetailNav,
      DetailSwiper,
      DetailShow
    },
    data () {
      return {
        iid: {},
        topImages: [],
        goodsInfo: {},
        columns: [],
        shop: {},
        detailInfo: {},
        paramInfo: {}

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
        // 获取 昌平信息
        this.shop = new shop(data.shopInfo)
        // 获取商店信息
        this.detailInfo = data.detailInfo
        // 获取商品详情
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 保存参数信息
        console.log(this.$refs.scroll.scroll)
        setTimeout(() => {
          this.$refs.scroll.refresh()
          console.log(123)
        }, 3000)
      })
    }
  }
</script>

<style scoped>
  .details {
    margin-bottom: 28px;
  }

  .view {
    height: calc(100vh - 44px - 49px);
  }
</style>