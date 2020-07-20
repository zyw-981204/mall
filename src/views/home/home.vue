<template>
  <div id="home">
    <nav-bar>
      <template slot="center">购物街</template>
    </nav-bar>
    <scroll class="view"
            ref="scroll"
            :probe-type='3'
            @scroll="GetPosition"
            :pull-up-load='true'
            @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners" :recommend="recommends"/>
      <recommend :recommend="recommends"/>
      <h1 class="popularTitle">今日流行</h1>
      <Popular :keywords='keywords'></Popular>
      <tab-control
              :titles="['流行','新款','精选']"
              class="tab-control"
              @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <to-top @click.native="ToTopClick" v-show="isShowToTop"/>
  </div>
</template>

<script>
  //引入方法
  import { getHomeMultidata, getHomeGoods } from '../../api/home'
  // 引入组件
  import NavBar from '../../components/common/NavBar/NavBar'
  import HomeSwiper from './HomeChildComponent/HomeSwiper'
  import recommend from './HomeChildComponent/recommend'
  import Popular from './HomeChildComponent/Popular'
  import TabControl from '../../components/content/TabControl/TabControl'
  import GoodsList from '../../components/content/GoodsList/GoodsList'
  import Scroll from '../../components/common/Scroll/Scroll'
  import ToTop from '../../components/common/ToTop/ToTop'

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
        isShowToTop: false
      }
    },
    components: {
      GoodsList,
      Popular,
      NavBar,
      HomeSwiper,
      recommend,
      TabControl,
      Scroll,
      ToTop
    },
    created () {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
      *事件监听
      */
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
      },
      // 点击回到顶部
      ToTopClick () {
        this.$refs.scroll.scrollTo(0, 0, 500)
        // 可以给组件设置节点然后可以获取里面的属性和方法
      },
      // 获取现在滚动到哪里了 来控制回到顶部按钮是否显示
      GetPosition (position) {
        // console.log(position.y)
        if (position.y < 0) {
          this.isShowToTop = true
        } else {
          this.isShowToTop = false
        }
      },
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
          console.log(this.goods)
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.scroll.refresh()
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

<style>
  #home {
    width: 100%;
    height: 100vh;
  }

  .popularTitle {
    text-align: center;
    font-size: 20px;
    padding: 5px 0 5px 0;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  .view {
    height: calc(100% - 44px - 49px);
  }
</style>
