var GraphQLDateTime =require('graphql-type-datetime') 

const {gql } = require('apollo-server-express');
var template =  `
scalar DateTime
type Query {
  _empty: String
}
type Mutation {
  _empty: String
}
`
module.exports.typeDefs =[template,
  require('./nas').TypeDefs,
  require('./tenant').TypeDefs,
]
var r1 = {
  DateTime: GraphQLDateTime,
  Query:{},
  Mutation:{}
}
var lodash = require('lodash')
// var r3 = require('./nas').TypeDefs
// var r3 = 
module.exports.resolvers = lodash.merge(r1,
    require('./nas').resolvers,
    require('./tenant').resolvers,
)
