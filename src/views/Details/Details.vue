<template>
  <div class="details">
    <detail-nav></detail-nav>
    <scroll :pull-up-load='false'
            ref="scroll"
            class="view details"
    >
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-show :get-columns="goodsInfo"></detail-show>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
  // 引入组件
  import DetailNav from './childComponents/detailNav'
  import DetailSwiper from './childComponents/detailSwiper'
  import DetailShow from './childComponents/detailShow'
  import DetailShopInfo from './childComponents/detailShopInfo'
  import DetailParamInfo from './childComponents/detailParamInfo'
  import DetailGoodsInfo from './childComponents/detailGoodsInfo'
  import Scroll from '../../components/common/Scroll/Scroll'
  import DetailCommentInfo from './childComponents/detailCommentInfo'
  import GoodsList from '../../components/content/GoodsList/GoodsList'
  // 引入方法
  import { getDetails, goodsInfo, shop, GoodsParam, getRecommond } from '../../api/details'
  import { debounce } from '../../utils/debounce'

  export default {
    name: 'Details',
    components: {
      GoodsList,
      DetailCommentInfo,
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
        paramInfo: {},
        commentInfo: {},
        recommend: []

      }
    },
    created () {
      // 获取当前商品的iid
      this.iid = this.$route.params.iid
      // 获取详情数据
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
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })
      // 获取推荐数据
      getRecommond().then((res) => {
        console.log(res, ' 我是recommend')
        this.recommend = res.data.data.list

        console.log(res.data.data.list)
      })
    },
    methods: {
      refresh () {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        } else {
          return {}
        }
      }
    },
    mounted () {
      let refresh = debounce(this.refresh(), 10000)
      this.$bus.$on('detailGoodsLoad', () => {
        // this.refresh()
        refresh()
        console.log('我完成了一次detailGoodload的加载')
      })
      this.$bus.$on('recommendLoad', () => {
        // 一定要判断scroll是否已经生成了 不然会报错
        // this.refresh()
        refresh()
        console.log('我完成了一次recommend的加载')
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