exports.init= (db) => {   
return async function(){
      var tbit = require('./tbit')
      console.log('init data...')
      var model = require('./model')(db)
      // return
      await model.Tenant.destroy({truncate:{cascade: true }})
      var tid  = tbit.id()
      var obj = {name:"tbit",id:tid}
      await model.Tenant.create(obj)      
      console.log('init demo data end')
    }
}