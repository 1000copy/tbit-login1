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
router.beforeEach((to, from, next) => {
  console.log(to,from)
  let getFlag = localStorage.getItem('islogin');
  console.log(getFlag != "islogin" , to.meta , to.meta.secretgarden,to.meta != undefined && to.meta.secretgarden != undefined && to.meta.secretgarden)
  if(getFlag != "islogin" || (to.meta != undefined && to.meta.secretgarden != undefined && to.meta.secretgarden)){    
    console.log(1)
        next()      
  }else{  
      console.log(2)
      next({path: '/login',})      
  }
});
router.afterEach(route => {
  window.scroll(0, 0);
});