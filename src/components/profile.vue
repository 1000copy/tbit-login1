<template>
  <div class="about">
    <h1>This is an profile page</h1>
  </div>
</template>
<script>
export default {
  mounted(){
  	if ('islogin' != localStorage.getItem("islogin"))
  		this.$router.replace({path:'/login'})
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