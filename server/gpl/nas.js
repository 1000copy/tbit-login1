exports.TypeDefs = `    
    extend type Query {        
        secret:Int
    }
  `
var tbit = require('../tbit')
var db = tbit.db()
var model = require('../model')(db)
exports.resolvers = {
    Query:{
        //{nas_pages}
        async secret(root,{}) {
            return 42
        },        
    },
    Mutation : {        
    }
}