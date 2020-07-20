<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommendItem">
      <a :href="item.link">
        <div class="recommendItemImg"><img :src="item.image" alt=""></div>
        <div class="recommendItemTitle">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recommend',
    props: {
      recommend: [Array, Object]
    }
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 20px;
    padding: 20px 0 30px 0;
    border-bottom: #eee solid 20px;
  }
  .recommendItem{
    margin: 0 auto;
  }
  .recommendItemImg {
    margin: 10px auto 10px;
  }
  .recommendItemImg  img{
    flex: 1;
    width: 80%;
  }

</style>