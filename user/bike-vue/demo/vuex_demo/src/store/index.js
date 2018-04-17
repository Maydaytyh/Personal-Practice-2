import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
// import cart from './modules/cart'
// import products from './modules/products'

Vue.use(Vuex)

const state = {
  count: '1',
  todos: [
    {id:1,text:'...',done:true},
    {id:2,text:'...',done:false}
  ],
  data: []
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  // modules: {
  //   cart
  // },
  mutations
})