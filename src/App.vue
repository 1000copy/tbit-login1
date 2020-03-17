<template>
  <div id="app">
    <div id="nav"  v-if="logined" >
      <router-link to="/public">public</router-link> |
      <router-link to="/profile">profile</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/logout">logout</router-link>
    </div>
    <router-view @logined="afterLogin"/>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
   mounted(){
   	   if ('islogin' != localStorage.getItem('islogin'))
   	   	  this.logined = false 
   },
   methods: {
        afterLogin(status) {
            this.logined = status;
        },
        logout() {
            this.logined = false;
        }
    },
	data() {
        return {
            logined: true,            
        }
    },
}
</script>

