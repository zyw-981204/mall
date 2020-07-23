<template>
  <div id="cart">
    <nav-bar>
      <div slot="center">购物车</div>
    </nav-bar>
    <scroll
            class="view"
            :probe-type="2"
    >
      <div class="nav-bar-bottom">
        <cart-item v-for="item in cart" :cart-item="item"/>
      </div>
    </scroll>
    <bottom-bar/>
  </div>
</template>

<script>
  import NavBar from '../../components/common/NavBar/NavBar'
  import CartItem from './cartChildComponents/cartItem'
  import BottomBar from './cartChildComponents/BottomBar'
  import Scroll from '../../components/common/Scroll/Scroll'

  export default {
    name: 'cart',
    components: { Scroll, BottomBar, CartItem, NavBar },
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

  .view {
    height: calc(100vh - 48px - 49px);
  }
</style>
