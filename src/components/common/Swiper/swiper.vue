<template>
  <swiper class="swiper swiper-home" :options="swiperOption">
    <swiper-slide v-for="banner in banners" :key="banner.key">
      <a :href="banner.link">
        <img :src="banner.image" class="full-width">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-loop',
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
    props: {
      banners: [Array, Object],
    },
    components: {
      Swiper,
      SwiperSlide
    }

  }
</script>

<style>
  .swiper-home {
    margin: 49px 0 0;
    width: 100%;
  }

  .full-width {
    display: block;
    width: 100%;
  }
  .swiper-pagination-bullet-active{
    background: #ff8198;
  }
</style>