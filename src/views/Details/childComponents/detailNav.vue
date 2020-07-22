<template>
  <nav-bar background='#123456' color="#ffffff">
    <div slot="center" class="detail-nav">
      <div v-for="(item,index) in titles" class="detail-nav-item"
           :class="{active:index ===currentIndex }"
           @click='checkInThis(index)'
           :key="index">
        <span>{{item}}</span>
      </div>
    </div>
    <div slot="left" @click="back">
      <img src="../../../assets/img/common/back.svg" alt="" class="back">
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from '../../../components/common/NavBar/NavBar'

  export default {
    name: 'detailNav',
    components: { NavBar },
    data () {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      checkInThis (index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      },
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    display: flex;
  }

  .detail-nav-item {
    flex: 1;
  }

  .active {
    color: #ff5777;
  }

  .back {
    margin-top: 12px;
    line-height: 49px;
  }
</style>