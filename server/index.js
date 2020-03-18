var port = 4000
var tbit = require('./tbit')
var db = tbit.db()
var demo = require('./demodata')
demo.init(db)()
var query1 = require('./gpl')

const express = require('express');
const app = express();
var session = require('express-session')
app.use(session({
  secret: 'tbit&reco',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
const { ApolloServer} = require('apollo-server-express');
const server = new ApolloServer({ 
    typeDefs:query1.typeDefs,
    resolvers:query1.resolvers,
    context: ({ req }) => ({ session: req.session })
  });
server.applyMiddleware({ app,path:'/graphql' });
app.use(express.static('../client/dist'))
app.listen({ port}, () =>{
    console.log(`api server ready at http://localhost:${port}${server.graphqlPath}`)    
});
