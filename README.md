# Login

这个自动登录的逻辑可以深挖做出多种实现,例如登录成功之后把用户信息加密并通过localstorage在多个tab之间公用,这样再新打开tab时就不需要再次自动登录.这里就以最简单的实现来进行讲解,基本流程如下:

- 用户请求页面资源
- 检查本地cookie/localstorage是否有token
- 如果没有token,不管用户请求打开的是哪个路由,都一律跳转到login路由
- 如果检查到token,先请求自动登录的接口,根据返回的结果判断是进入用户请求的路由还是跳转到login路由

ref : https://segmentfault.com/a/1190000016040068

关于vue登录注册，并保持登录状态，是vue玩家必经之路，网上也有很多的解决方法，但是有一些太过于复杂，新手可能会看的一脸懵逼，现在给大家介绍一种我自己写项目在用而且并不难理解的一种方法。

首先，标记每个路由进入是否需要登录：

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
	    meta: {secretgarden: true},
	  },  
	  {
	    path: '/logout',
	    name: 'logout',
	    component: () => import('../components/logout.vue'),
	    meta: {secretgarden: false},
	  }
	]


登录后需要设置状态：

          localStorage.setItem("Flag", "isLogin");
          this.$router.push("/home");
          this.$emit("logined", true)// 登录成功后需要发射事件，通知首页更新显示内容

在路由切换守卫代码函数中，检查如果是已经路由直接放行，如果没有登录而去向路由需要登录的化，那么导向到login路由内：

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

这样就已经完成了Vue的登录注册，当用户关闭浏览器或者第二天再次进入网站，用户依旧可以保持着登录的状态直到用户手动退出登录。

用户退出只需要localStorage.removeItem("Flag")即可:

	  	logout(){
	  	  localStorage.setItem('islogin',"")
	      this.$router.push("/profile")
	      this.$emit("logined", false);
	  	},

首页app.vue应该根据是否登录来决定显示内容：

    <div id="nav"  v-if="logined" >
      <router-link to="/public">public</router-link> |
      <router-link to="/profile">profile</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/logout">logout</router-link>
    </div>
    <router-view @logined="afterLogin"/>

这样做容易理解，但是有一个问题，就是如果用户直接访问/profile，也就是不是切换而来的，那么路由切换守卫代码不会执行，因此也不能防止在未受权情况下的访问。

所以，这个方案不够好。

# tbit-login

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

