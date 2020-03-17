import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to,from)
  let getFlag = localStorage.getItem('islogin');
  if(getFlag != "islogin" && to.meta.secretgarden){    
    next({path: '/login',})    
  }else
      next()      
});
router.afterEach(route => {
  window.scroll(0, 0);
});