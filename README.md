
# Vuejs Login 一种好用且易于理解的一种登录控制方法。

算法的要点是：

1. vue单页面应用是有多个路由的,一部分是需要登录的，一部分是公开的，无法登录即可查看和操作。
2. 我们会在路由中通过标志来标记两者的差别
3. 我们可以在路由导航发生之前做检查，如果登录了或者即将导航到的路由无需登录即可查看，那么就允许此导航继续
4. 否则，把路由导航到登录页面

为此，我们设置一个案例，此案例有4个路由分别是

	login
	logout
	profile
	public

首先，使用secretgarden标记每个路由进入是否需要登录：

	const routes = [
	  {
	    path: '/public',
	    name: 'public1',
	    alias:'/',
	    component: public1,
	    meta: {secretgarden: false},
	  },
	  {
	    path: '/login',
	    name: 'login',
	    component: login,
	    meta: {secretgarden: false},
	  },  
	  {
	    path: '/profile',
	    name: 'profile',
	    component: () => import('../components/profile.vue'),	    
	  },  
	  {
	    path: '/logout',
	    name: 'logout',
	    component: () => import('../components/logout.vue'),	    
	  }
	]


登录后需要设置状态：

         this.$store.commit('dologin')

我们使用vuex来做状态管理器


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

在main.js内，添加路由切换守卫代码，检查如果是已经登录直接放行，如果没有登录而去向路由需要登录的化，那么导向到login路由内：

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


首页app.vue应该根据是否登录来决定显示内容：

	<template>
	  <div id="app">
	    <div id="nav"  v-if="islogin" >
	      <router-link to="/public">public</router-link> |
	      <router-link to="/profile">profile</router-link> |
	      <router-link to="/login">login</router-link> |
	      <router-link to="/logout">logout</router-link>
	    </div>
	    <router-view />
	  </div>
	</template>
	<script>
	export default {
	   mounted(){
	   	   console.log(1,this.islogin ,this.$router.currentRoute.name)
	       if (!this.islogin && this.$router.currentRoute.name != "login")
	          this.$router.push({name:"login"})
	   },
	   computed:{
	    islogin(){
	      return this.$store.state.islogin
	    }
	   },
	}
	</script>



## 问题

曾经出现这样的情况：

	这样做容易理解，但是有一个问题，就是如果用户直接访问profile，也就是不是切换而来的，那么路由切换守卫代码不会执行，因此也不能防止在未受权情况下的访问。

但是后来无法重现了。

# vue store 状态的多标签共享

vue store 状态，默认在不同的浏览器标签是不会共享的。想要共享的化，需要参考此[文档](https://stackoverflow.com/questions/53563268/vuex-how-to-persist-store-updates-across-different-tabs).

# vue store 在浏览器刷新时会消失

想要保持的化，需要参考此文档： https://juejin.im/post/5c809599f265da2dbe030ec6

# ref 

https://www.thepolyglotdeveloper.com/2018/04/simple-user-login-vuejs-web-application/
https://segmentfault.com/a/1190000016040068