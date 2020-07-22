<template>
  <div class="detail-show">
    <div class="title">{{newGoodsInfo.title}}</div>
    <div class="price">
      <span class="new-price">{{newGoodsInfo.newPrice}}</span>
      <span class="old-price">{{newGoodsInfo.OldPrice}}</span>
      <span class="discount">{{newGoodsInfo.discount}}</span>
    </div>
    <div class="services" v-if="newGoodsInfo.services">
       <span class="services-item" v-for="(item,index) in newGoodsInfo.services" :key="index">
        <img :src="item.icon">
        <span>{{item.name}}</span>
      </span>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'detailShow',
    props: ['getColumns'],
    data () {
      return {
        newGoodsInfo: {}
      }
    },
    watch: {
      getColumns (val) {
        this.newGoodsInfo = val
      }
    }
  }
</script>
<style scoped>
  .detail-show {
    width: 96%;
    margin: 0 auto;
  }

  .title {
    font-size: 22px;
    color: #222;
    padding: 15px 0 15px 0;
  }

  .price {
    margin-top: 10px;
  }

  .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .old-price {
    font-size: 13px;
    /*margin-left: 5px;*/
    text-decoration: line-through;
  }

  .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .columns {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    justify-content: space-between;
  }

  .services {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .services-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .services-item span {
    font-size: 12px;
    color: #333;
  }

</style>
