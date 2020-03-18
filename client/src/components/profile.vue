<template>
  <div class="about">
    <h1>This is an {{secret}} page</h1>
  </div>
</template>
<script>
var axios = require('axios')
export default {
	async mounted(){
		// console.log(1)
		var res = await this.ql('{secret}')
		this.secret = res.data.data.secret		
	},
	data(){
		return {secret:24}
	},
	methods:{
		async ql(query){
		  try{
		    var config = {
		          method: 'post',
		          url: '/graphql',
		          data: {query},         
		        }
		    var response =  await axios(config)
		    if(response.data.errors){
		        if ('authfailure' == response.data.errors[0].message)
		           throw new Error('authfailure')
		        else if ('loginfailure' == response.data.errors[0].message)
		           throw new Error('loginfailure')
		        else
		          console.error("QLERR:",response.data.errors[0].message)  
		      }
		    return response
		  }catch(e){
		    console.log("QLERR:",e)
		  }  
		}
	}
}
</script>
