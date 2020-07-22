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
        scroll: {}
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
      // console.log(this.$refs.wrapper)
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
      })
    },
    methods: {
      scrollTo (x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      refresh () {
        setTimeout(() => {
          this.scroll.refresh()
        }, 10)
      }
    }
  }
</script>

<style scoped>
</style>