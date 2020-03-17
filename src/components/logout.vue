<template>
  <div class="hello">
    <h1>{{ msg }}</h1>   
    <button @click="logout">Logout?</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  methods:{
  	logout(){
  		localStorage.setItem('islogin',"")
      this.$router.push("/profile")
      this.$emit("logined", false);
  	},
  },
}
</script>
