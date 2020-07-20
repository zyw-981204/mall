<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data () {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default () {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    mounted () {
      console.log(this.$refs.wrapper)
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      this.scroll.on('scroll', (position) => {
        // console.log(position.x,position.y)
        this.$emit('scroll', position)
      })
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // 在发生下拉刷新的时候把事件传给父组件
        // 在2秒后实现完成上拉加载更多
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 2000)
      })
    },
    methods: {
      scrollTo (x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      }
      // loadingMore (loadingMoreInfo) {
      //   this.scroll.on('pullingUp', (loadingMoreInfo) => {
      //     console.log('上拉加载更多')
      //   })
      // this.scroll.finishPullUp()
      // }
    }
  }
</script>

<style scoped>
</style>