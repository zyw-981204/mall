<template>
  <div id="home">
    <nav-bar>
      <template slot="center">购物街</template>
    </nav-bar>
    <tab-control
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl0"
            v-show="isTop"
            class="tab_control"/>
    <scroll
            class="view"
            ref="scroll"
            :probe-type='3'
            @scroll="GetPosition"
            :pull-up-load='true'
            @pullingUp="LoadMore">
      <home-swiper
              :banners="banners"
              :recommend="recommends"
              @HomeSwiperLoad="getOffSetTop"
      />
      <recommend :recommend="recommends"/>
      <h1 class="popularTitle">今日流行</h1>
      <Popular :keywords='keywords'></Popular>
      <tab-control
              :titles="['流行','新款','精选']"
              :class="{tab_control: this.isTop}"
              @tabClick="tabClick"
              ref="tabControl1"
              v-show="!isTop"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <to-top @click.native="ToTopClick"
            v-show="isShowToTop"/>
  </div>
</template>
<script>
  //引入方法
  import { getHomeMultidata, getHomeGoods } from '../../api/home'
  import { debounce } from '../../utils/debounce'
  // 引入组件
  import NavBar from '../../components/common/NavBar/NavBar'
  import HomeSwiper from './HomeChildComponent/HomeSwiper'
  import recommend from './HomeChildComponent/recommend'
  import Popular from './HomeChildComponent/Popular'
  import TabControl from '../../components/content/TabControl/TabControl'
  import GoodsList from '../../components/content/GoodsList/GoodsList'
  import Scroll from '../../components/common/Scroll/Scroll'
  import { backTopMixin } from '../../utils/mixin'

  // 引入样式表

  export default {
    name: 'home',
    data () {
      return {
        banners: {},
        recommends: {},
        keywords: {},
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentControl: 'pop',// 用来控制当前选择的goods是什么
        topOffSetTop: 0,
        y: 0
      }
    },
    mixins: [backTopMixin],
    components: {
      GoodsList,
      Popular,
      NavBar,
      HomeSwiper,
      recommend,
      TabControl,
      Scroll
    },
    created () {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted () {
      const refresh = debounce(this.refresh(), 50)
      // 防抖
      this.$bus.$on('refreshImg', () => {
        refresh()
      })
    },
    activated () {
      // console.log('进页面的时候Y的值', this.y)
      this.scrollTo(0, this.y)
      this.refresh()
    },
    deactivated () {
      this.y = this.getScrollY()
      // console.log('离开页面的时候Y的值', this.y)
    },
    methods: {
      /*
      *事件监听
      */
      getScrollY () {
        if (this.$refs.scroll) {
          return this.$refs.scroll.scroll.startY
        } else {
          return 0
        }
      },
      scrollTo (x, y, delay = 0) {
        // console.log(this.$refs.scroll.scroll)
        // console.log(`跳转时x的值${x},跳转的时候y的值${y}`)
        this.$refs.scroll && this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(x, y, delay)
      },
      refresh () {
        this.$refs.scroll && this.$refs.scroll.refresh()
      },
      getOffSetTop () {
        this.topOffSetTop = this.$refs.tabControl1.$el.offsetTop
        // offsetTop：元素到offsetParent顶部的距离 具有定位属性的祖宗元素
        // console.log(this.topOffSetTop)
      },
      // 对切换进行转换
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentControl = 'pop'
            break
          case 1:
            this.currentControl = 'new'
            break
          case 2:
            this.currentControl = 'sell'
            break
        }
        // 对tab-control的不统一进行统一
        this.$refs.tabControl0.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      },

      // 获取现在滚动到哪里了 来控制回到顶部按钮是否显示
      GetPosition (position) {
        this.isShowToTop = position.y < 0
        this.isTop = (-position.y + 93) > this.topOffSetTop
      },
      // 下拉加载更多
      LoadMore () {
        this.getHomeGoods(this.currentControl)
      },
      /*
      *网络请求方法
      */
      getHomeMultidata () {
        getHomeMultidata()
          .then((res) => {
            // console.log(res)
            this.banners = res.data.data.banner.list
            this.recommends = res.data.data.recommend.list
            this.keywords = res.data.data.keywords.list.splice(3, 4)
          }).catch((err) => {
          console.log(err)
        })
      },
      getHomeGoods (type) {
        var page = this.goods[type].page + 1
        // 请求上一次请求的页面后面一页
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll && this.$refs.scroll.scroll.finishPullUp()
          this.$refs.scroll && this.$refs.scroll.scroll.refresh()
          // 对现在的页面进行更新
        })
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.currentControl].list
      }
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    height: 100vh;
  }

  .popularTitle {
    text-align: center;
    font-size: 20px;
    padding: 5px 0 5px 0;
  }

  .tab_control {
    transition: all 4s;
    position: fixed;
    top: 49px;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .view {
    height: calc(100% - 44px - 49px);
  }
</style>
