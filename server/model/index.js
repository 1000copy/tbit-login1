module.exports = function(db){
    const {Model, DataTypes,ABSTRACT } = require('sequelize');
    // normalize   
    class  QTY extends ABSTRACT {
        constructor () {
            super()
            this.key = 'decimal(10,2)'
        }
    }
    class  AMOUNT extends ABSTRACT {
        constructor () {
            super()
            this.key = 'decimal(12,4)'
        }
    }
    class  IPADDR extends ABSTRACT {
        constructor () {
            super()
            this.key = 'CHAR(15)'
        }
    }
    class TID extends ABSTRACT {
        constructor () {
            super()
            this.key = 'char(27)'
        }    
    }
    DataTypes.TID = TID
    DataTypes.AMOUNT = AMOUNT
    DataTypes.QTY = QTY
    DataTypes.IPADDR = IPADDR
    // code template
    class Foo extends Model {}
    Foo.init({
    id: {
        type:DataTypes.TID,
        primaryKey: true
    },  
    }, { sequelize:db, freezeTableName: true, });
    var options = { sequelize:db,freezeTableName: true, timestamps: true,}
    class Bar1 extends Model {}
    Bar1.init({
    id: {
        type:DataTypes.TID,
        primaryKey: true
    },  
    }, options);
    class Olt extends Model {}
    Olt.init({
        id: {
            type:DataTypes.TID,
            primaryKey: true
        },    
        regionid1:{type:DataTypes.TID},
        regionid2:{type:DataTypes.TID},
        regionid3:{type:DataTypes.TID},
        name:{type:DataTypes.STRING},
        enabled:{type:DataTypes.BOOLEAN},
        memo:{type:DataTypes.STRING},  
        tid:DataTypes.TID,
    }, options);
    class Nas extends Model {}
    Nas.init({
        id: {
            type:DataTypes.TID,
            primaryKey: true
        },        
        name:{type:DataTypes.STRING},
        type:{type:DataTypes.STRING},
        ipaddr:{type:DataTypes.STRING},
        secret:{type:DataTypes.STRING},
        enabled:{type:DataTypes.BOOLEAN},
        memo:{type:DataTypes.STRING},  //
        tid:DataTypes.TID,
    }, options);

    class IPPool extends Model {}
    IPPool.init({
        id: {
            type:DataTypes.TID,
            primaryKey: true
        },    
        name:{type:DataTypes.STRING},
        start:{type:DataTypes.IPADDR},
        stop:{type:DataTypes.IPADDR},
        enabled:{type:DataTypes.BOOLEAN},
        memo:{type:DataTypes.STRING},  
        tid:DataTypes.TID,
    }, options);
   
    this.Foo = Foo
    this.Nas = Nas
    this.Olt = Olt
    this.IPPool = IPPool
    this.Tenant = require('./tenant')(options)
    function a(){
        db.sync()
          .then(() => {      
          })
          .then(jane => {
            
          });    
    }//
    a()
    return this
}
// http://semlinker.com/node-sequelize-nvm/
// http://semlinker.com/node-sequelize-1vm/
// http://semlinker.com/node-sequelize-1v1/
// http://semlinker.com/node-sequelize-quickstart/
// netstat - tunlp | grep 1812
