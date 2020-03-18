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
      if (true/*some login for login*/){
    		this.$store.commit('dologin')
        this.$router.push("/profile")
      }
  	},
  },
}
</script>
