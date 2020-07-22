<template>
  <swiper class="swiper swiper-home" :options="swiperOption">
    <swiper-slide v-for="banner in banners" :key="banner.key">
      <img :src="banner" class="full-width">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'detailSwiper',
    title: 'Loop mode / Infinite loop',
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
          autoplay: {
            disableOnInteraction: false,
            delay: 2500
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    methods: {},
    props: {
      banners: [Array, Object]
    },
    components: {
      Swiper,
      SwiperSlide
    }

  }
</script>

<style scoped>
  .swiper-home {
    width: 100%;
    margin-top: 49px;
    height: 50vh;
    /*overflow: hidden;*/
  }

  .full-width {
    width: 100%;
    display: block;
  }
</style>