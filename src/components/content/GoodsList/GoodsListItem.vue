<template>
  <div class="goods-list-item" @click="goToDetail">
    <!--    对gooodslist进行复用-->
    <img v-if="goodsItem.show" v-lazy="getImg" @load="imgLoad">
    <img v-else v-lazy="goodsItem.image" @load="recommendLoad">
    <p class="goods-list-item-description" :title="goodsItem.title">{{goodsItem.title}}</p>
    <span class="goods-list-item-price">￥{{goodsItem.price}}</span>
    <span class="goods-list-item-cfav">❥{{goodsItem.cfav}}</span>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: [Object],
        default () {
          return {}
        }
      }
    },
    created () {
      setTimeout(() => {
        console.log(this.goodsItem, '我是goodsitem')
      }, 10000)
    },
    methods: {
      imgLoad () {
        this.$bus.$emit('refreshImg')
      },
      recommendLoad () {
        this.$bus.$emit('recommendLoad')
      },
      goToDetail () {
        this.$router.push('/details/' + this.goodsItem.iid)
      }
    },
    computed: {
      getImg () {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    }

  }
</script>

<style scoped>
  .goods-list-item {
    display: inline-block;
    width: 48%;
    text-align: center;
    margin: 0 auto;
    vertical-align: bottom;
  }

  .goods-list-item:nth-child(odd) {
    margin-right: 4%;
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-list-item-description {
    padding: 4px 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .goods-list-item-price {
    padding: 5px 5% 5px 0;
    display: inline-block;
  }

  .goods-list-item-cfav {
    padding: 5px 0 5px 5%;
    display: inline-block;
    color: red;
  }
</style>