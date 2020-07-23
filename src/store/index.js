import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: []
  },
  mutations: {
    addCounter (state, payload) {
      payload.amount++
    },
    addToCart (state, payload) {
      state.goodsList.push(payload)
    }
  },
  actions: {
    addGoods (context, payload) {
      let oldProduct = context.state.goodsList.find((item) => {
        return item.iid === payload.iid
      })
      console.log(oldProduct)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.amount = 1
        context.commit('addToCart', payload)
      }
    }
  },
  modules: {},
  getters: {
    goodsList (state) {
      return state.goodsList
    },
    cartCount (state, getters) {
      console.log(getters.goodsList, 123123)
      if (getters.goodsList) {
        return getters.goodsList.length
      }
    }
  }
})
