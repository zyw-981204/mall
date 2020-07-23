<template>
  <div class="cart-item">
    <check-button @checkBtnClick="checkedChange" v-model="cartItem.checked"></check-button>
    <div class="cart-item-img"><img :src='cartItem.image' alt=""></div>
    <div class="cart-item-details">
      <div class="cart-item-details-title">{{cartItem.title}}</div>
      <div class="cart-item-details-desc">{{cartItem.desc}}</div>
      <span class="cart-item-price">{{cartItem.price}}</span>
      <span class="cart-item-amount">{{cartItem.amount}}</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

  export default {
    name: 'cartItem',
    components: { CheckButton },
    props: {
      cartItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      checkedChange: function () {
        this.cartItem.checked = !this.cartItem.checked
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .cart-item-img {
    padding: 5px;
  }

  .cart-item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .cart-item-details {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .cart-item-details .cart-item-details-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .cart-item-price {
    display: inline-block;
    width: 40%;
    padding-left: 10%;
    text-align: left;
    color: red;
  }

  .cart-item-amount {
    display: inline-block;
    width: 40%;
    text-align: right;
  }
</style>