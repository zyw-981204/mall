<template>
  <div class="details_all">
    <detail-nav
            ref="detailNav"
            @tabClick="goToNavTop"
    ></detail-nav>
    <scroll :pull-up-load='false'
            ref="scroll"
            :probe-type="3"
            class="view details"
            @detailScroll="getDetailScroll">
      <detail-swiper :banners="topImages"></detail-swiper>
      <detail-show :get-columns="goodsInfo"></detail-show>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <to-top @click.native="ToTopClick"
            v-show="isShowToTop"/>
    <detail-bottom-bar
            @addToCart="addToCart"></detail-bottom-bar>
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
  import { cartItem } from '../../api/cart'
  import { debounce } from '../../utils/debounce'
  import DetailBottomBar from './childComponents/DetailsBottomBar'
  import { backTopMixin } from '../../utils/mixin'

  export default {
    name: 'Details',
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
        recommend: [],
        navTop: [0],
        amount: 0,
        goods: {}
      }
    },
    components: {
      DetailBottomBar,
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
    methods: {
      addToCart () {
        this.goods = new cartItem(this.goodsInfo, this.topImages[0], this.amount, this.iid)
        console.log(this.goods, 111)
        this.$store.dispatch('addGoods', this.goods)
      },
      getNavTop () {
        //获取
        this.navTop = [0]
        if (this.$refs.params || this.$refs.comment || this.$refs.recommend) {
          this.navTop[1] = -(this.$refs.params.$el.offsetTop - 49)
          this.navTop[2] = -(this.$refs.comment.$el.offsetTop - 49)
          this.navTop[3] = -(this.$refs.recommend.$el.offsetTop - 49)
        }
      },
      goToNavTop (index) {
        // 去
        this.scrollTo(0, this.navTop[index], 500)
      },
      scrollTo (x, y, delay = 0) {
        this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(x, y, delay)
      },
      refresh () {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        } else {
          return {}
        }
      },
      getDetailScroll (position) {
        // if (position.y > this.navTop[1]) {
        //   this.$refs.detailNav.currentIndex = 0
        //   this.count++
        // } else if (position.y > this.navTop[2]) {
        //   this.$refs.detailNav.currentIndex = 1
        //   this.count++
        // } else if (position.y > this.navTop[3]) {
        //   this.$refs.detailNav.currentIndex = 2
        //   this.count++
        // } else {
        //   this.$refs.detailNav.currentIndex = 3
        //   this.count++
        // }
        this.isShowToTop = (position.y < 0)
        if ((this.$refs.detailNav.currentIndex !== 0) && position.y > this.navTop[1]) {
          this.$refs.detailNav.currentIndex = 0
        }
        if ((this.$refs.detailNav.currentIndex !== 1) && (position.y < this.navTop[1]) && position.y > this.navTop[2]) {
          this.$refs.detailNav.currentIndex = 1
        }
        if ((this.$refs.detailNav.currentIndex !== 2) && (position.y < this.navTop[2]) && position.y > this.navTop[3]) {
          this.$refs.detailNav.currentIndex = 2
        }
        if ((this.$refs.detailNav.currentIndex !== 3) && position.y < this.navTop[3]) {
          this.$refs.detailNav.currentIndex = 3
        }
      }
    },
    created () {
      // 获取当前商品的iid
      // console.log(this.$route)
      this.iid = this.$route.params.iid
      // 获取详情数据
      getDetails(this.iid).then((res) => {
        let data = res.data.result
        // 获取对应表单需要的数据
        this.topImages = data.itemInfo.topImages
        // 获取轮播图
        this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取产品基础信息
        this.shop = new shop(data.shopInfo)
        // 获取商店信息
        this.detailInfo = data.detailInfo
        // 获取商品详情
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 保存参数信息
        if (data.rate.list) {
          // 展示第一条评论
          this.commentInfo = data.rate.list[0]
        }
      })
      // 获取推荐数据
      getRecommond().then((res) => {
        // console.log(res, ' 我是recommend')
        this.recommend = res.data.data.list
      })
    },
    mounted () {
      let refresh = debounce(this.refresh(), 1000)
      this.$bus.$on('detailGoodsLoad', () => {
        // this.refresh()
        refresh()
        this.getNavTop()
        // console.log('我完成了一次detailGoodload的加载')
      })
      this.$bus.$on('recommendLoad', () => {
        // 一定要判断scroll是否已经生成了 不然会报错
        // this.refresh()
        refresh()
        this.getNavTop()
        // console.log('我完成了一次recommend的加载')
      })
    },
    mixins: [backTopMixin]
  }
</script>

<style scoped>
  .details_all {
    margin-bottom: 28px;
  }

  .view {
    height: calc(100vh - 44px - 49px);
  }
</style>