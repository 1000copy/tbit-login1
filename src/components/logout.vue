<template>
  <div class="hello">    
    <button @click="logout">Logout?</button>
  </div>
</template>

<script>
export default {
  methods:{
  	logout(){
  		this.$store.commit('dologout')
      this.$router.push("/login").catch((err) => {
        console.log(`Problem handling something: `,err);
      });      
  	},
  },
}
</script>
