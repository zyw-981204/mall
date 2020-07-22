<template>
  <div id="category">
    <div class="content">
      <ul>
        <li>123123123</li>
        <li>123123123</li>
        <li>123123123</li>
        <li>123123123</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'category',
    data () {
      return {}
    },
    mounted () {
      new BScroll('#category', {})
    }
  }
</script>

<style>
  #category {
    height: 200px;
    background: red;
  }

  .content {

  }
</style>
