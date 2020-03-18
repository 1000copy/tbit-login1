module.exports = function(options){
    const {Model, DataTypes} = require('sequelize');
    class Tenant extends Model {}
    Tenant.init({
        id: {
            type:DataTypes.TID,
            primaryKey: true
        },  
        name:DataTypes.STRING,
        muser:DataTypes.STRING,
        mpassword:DataTypes.STRING,
        memo:DataTypes.STRING,
        enabled:DataTypes.BOOLEAN,
        tid:DataTypes.TID,
    }, options);
    return Tenant
}