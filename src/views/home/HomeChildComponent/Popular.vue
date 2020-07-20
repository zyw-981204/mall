<template>
  <div class="popular">
    <div v-for="item in keywords" class="popularItem">
      <a :href="item.link">
        <div class="popularItemImg"><img
                src="https://s10.mogucdn.com/mlcdn/c45406/180913_036dli57aah85cb82l1jj722g887g_225x225.png" alt="">
        </div>
        <div class="popularItemTitle">{{item.words}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Popular',
    props: {
      keywords: [Array, Object]
    }
  }
</script>

<style scoped>
  .popular {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 4px 0 0 0 ;
    margin-bottom: 20px;
  }

  .popularItem {
    margin: 0 auto;
  }

  .popularItemImg {
    margin: 10px auto 10px;
  }

  .popularItemImg img {
    flex: 1;
    width: 80%;
  }

</style>