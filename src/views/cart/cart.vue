<template>
  <div id="cart">
    <nav-bar>
      <div slot="center">购物车</div>
    </nav-bar>
    <div class="nav-bar-bottom">
      <cart-item v-for="item in cart" :cart-item="item"></cart-item>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/NavBar/NavBar'
  import CartItem from './cartChildComponents/cartItem'
  import BottomBar from './cartChildComponents/BottomBar'

  export default {
    name: 'cart',
    components: { BottomBar, CartItem, NavBar },
    data () {
      return {
        cart: []
      }
    },
    mounted () {
      this.cart = this.$store.state.goodsList
    }
  }
</script>

<style scoped>
  .nav-bar-bottom {
    margin-top: 44px;
  }
</style>
