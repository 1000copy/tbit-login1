exports.TypeDefs = `
    type Tenant {
        id: String
        name: String
        enabled:Boolean
        memo:String
        muser:String
        mpassword:String
    }
    input TenantInput {
        name: String
        enabled:Boolean
        memo:String
        muser:String
        mpassword:String
    }
    extend type Query {        
        tenant_list(page:Int,id:String): [Tenant]
        tenant_pages(search:String):Int
        tenant_single(id: String!): Tenant
        tenant_csv(ids:[String]): String     
        tenant_getcurrent: String
    }
    extend type Mutation {
        tenant_create(input:TenantInput): Tenant
        tenant_update(input:TenantInput,id:String): Int
        tenant_delete(id:String): Int
        tenant_enable(enable:Boolean,ids:[String]): Boolean
        tenant_import(csv:String): Boolean
        tenant_setcurrent(id:String): Boolean        
    }
  `
var tbit = require('../tbit')
var db = tbit.db()
var model = require('../model')(db)
exports.resolvers = {
    Query:{
        //{tenant_pages}
        async tenant_pages(root,{search}) {
            var like = `%${search}%`
            var a = (await model.Tenant.count({ where:{name:{[tbit.like]:like}}}))
            a = Math.ceil(a/tbit.PAGELENGTH)
            // console.log(a)
            return a
        },
        async  tenant_list(root,{page,id}){
            var like = `%${id}%`
            // console.log(1)//
            try{
                if (id && id != "" ){
                    // console.log(2)//
                    var result = await model.Tenant.findAll(
                        {
                            limit:[(page-1)*tbit.PAGELENGTH,tbit.PAGELENGTH],
                            where:{name:{[tbit.like]:like}},                            
                        })
                    // console.log(result)//
                    return result 
                }
                else{
                    // console.log(22)
                    var result = await model.Tenant.findAll(
                    {
                        limit:[(page-1)*tbit.PAGELENGTH,tbit.PAGELENGTH],                        
                    })
                    return result
                }
            }
            catch(e){
                console.log(e)
            }
        },
        async  tenant_csv(root,{ids}){
            var list = await model.Tenant.findAll({where:{id:ids}})
            var result = []
            for(var i = 0;i<list.length;i++){
                delete list[i].dataValues.updatedAt
                delete list[i].dataValues.createdAt
                delete list[i].dataValues.id
                delete list[i].dataValues.BandwidthId
                result.push(list[i].dataValues)
            }
            function convertToCSV(arr) {
                const array = [Object.keys(arr[0])].concat(arr)
              
                return array.map(it => {
                  return Object.values(it).toString()
                }).join('\n')
              }
              return convertToCSV(result)
        },
        //{tenant_single(id:""){id,name}}
        async  tenant_single(root, { id }){
            var a  = await model.Tenant.findAll(
                {
                    // attributes: ['id',"name"],
                    where:{id:id}
                })
            a = a[0].dataValues        
            // console.log(a,root)
            return a
        },
        async tenant_getcurrent(root,{},context) {
            // console.log(context.session)
            // context.session.tenant.id = id
            return context.session.tenant.id
        },
    },
    Mutation : {
        // mutation{tenant_create(name:"nas3",id:""){id,name}}
        // mutation{tenant_create(input:{name:"100m"}){id}}
        async tenant_create(root,{input}) {
            var obj = input
            obj.id = tbit.id()
            var obj1 = model.Tenant.create(obj)
            return obj1  
        },        
        // mutation{tenant_update(id:"01DWBS7AVV3GFGC1D40E43Z108",name:"nas3new")}
        async tenant_update (root,{input,id}) {
            var a =  await model.Tenant.update(input,{where:{id}})
            // console.log(a)
            return a[0]                
        },        
        // mutation{tenant_delete(id:"01DWBRWS0GVF64TTE3Z47ZTWN5")}
        async tenant_delete(root,{id}) {
            return await model.Tenant.destroy({where:{id}})
        },
        async tenant_setcurrent(root,{id},context) {
            
            context.session.tenant =  context.session.tenant || {}
            context.session.tenant.id = id
            console.log(context.session.tenant)
            return true
        },        
        async tenant_enable(root,{enable,ids}) {
            // var a =  await model.Tenant.update({enable},{where:{id:{in:ids}}})            
            var a =  await model.Tenant.update({enabled:enable},{where:{id:ids}})
            // console.log(a,ids)
            return !!a
        },
        async tenant_import(root,{csv}){
            var objs = tbit.csvJSON(csv) 
            for(var i= 0 ;i<objs.length;i++){
                var obj = objs[i]                
                if(!obj.id){
                    obj.id = tbit.id()
                }               
                delete obj.BandwidthId
                var a =  await model.Tenant.create(obj)                
            }
            return !!a
        }
    }
}