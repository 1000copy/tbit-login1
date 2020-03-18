//vue.config.js
module.exports = {
	devServer: {
		port: 8080,		
		host: "localhost",		
		https: false,		
		open: true,
		proxy: {
			"/graphql": {
				target: "http://localhost:4000/graphql",
				changeOrigin: true, //是否跨域
				ws:true,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}
}