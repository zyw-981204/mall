import ToTop from '../components/common/ToTop/ToTop'

export const backTopMixin = {
  data () {
    return {
      isTop: false,
      isShowToTop: false
    }
  },
  components: {
    ToTop
  },
  methods: {
    ToTopClick () {
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 500)
      // 点击回到顶部
    }
  }
}
