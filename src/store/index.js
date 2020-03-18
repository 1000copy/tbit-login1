import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	islogin:false
  },
  mutations: {
  	dologin:(state)=>{state.islogin = true},
  	dologout:(state)=>{state.islogin = false},
  },
  actions: {
  },
  modules: {
  }
})
