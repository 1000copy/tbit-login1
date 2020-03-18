module.exports = function(options){
    const {Model, DataTypes} = require('sequelize');
    class Bandwidth extends Model {}
    Bandwidth.init({
    id: {
        type:DataTypes.TID,
        primaryKey: true
    },
    name:DataTypes.STRING,
    enabled:DataTypes.BOOLEAN,
    tx:DataTypes.QTY,
    rx:DataTypes.QTY,
    txBurst:{
        type:DataTypes.QTY,
        defaultValue:0},
    rxBurst:DataTypes.QTY,
    txBurstDue:DataTypes.QTY,
    rxBurstDue:DataTypes.QTY,
    txMin:DataTypes.QTY,
    rxMin:DataTypes.QTY,
    tid:DataTypes.TID,
    }, options);
    return Bandwidth
}