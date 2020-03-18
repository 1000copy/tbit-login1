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
// function islogin(){  
//   return localStorage.getItem('islogin') == "islogin"
// }
function isSecret(to){
  // console.log(!!to.meta,to.meta.secretgarden==false)
  return !(!!to.meta && to.meta.secretgarden==false)
}
router.beforeEach((to, from, next) => {
  if( store.state.islogin || !isSecret(to)){      
      next()      
  }else{        
      next({path: '/login',})  
  }
});
router.afterEach(route => {
  window.scroll(0, 0);
});