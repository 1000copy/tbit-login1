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
      console.log(1)
   	   if (!this.islogin && this.$router.currentRoute.name != "login"){
        console.log(22)
          this.$router.replace({name:"login"}).catch(function(err){console.log(err)})
          console.log(33)
       }
   },
   computed:{
    islogin(){
      return this.$store.state.islogin
    }
   },
}
</script>

