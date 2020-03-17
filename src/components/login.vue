<template>
  <div class="hello">
    <h1>{{ msg }}</h1>   
    <button @click="login">Login</button>
  </div>
</template>
<script>
export default {
  props: {
    msg: String
  },
  methods:{
  	login(){
  		localStorage.setItem("islogin", "islogin")
      this.$router.push("/profile")
      this.$emit("logined", true);
  	},
  },
}
</script>
