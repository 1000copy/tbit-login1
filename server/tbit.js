exports.PAGELENGTH =   10
exports.csvJSON = function (b64){
    function atob(str){
        return Buffer.from(b64, 'base64').toString()
    }
    csv = atob(b64)
    console.log(csv)
    var lines=csv.split("\n");              
    var result = [];
    var headers=lines[0].split(",");              
    for(var i=1;i<lines.length;i++){              
        var obj = {};
        var currentline=lines[i].split(",");              
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }              
        result.push(obj);              
    }              
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}
const { Sequelize, Model, DataTypes,ABSTRACT } = require('sequelize');
exports.like = Sequelize.Op.like
exports.in = Sequelize.Op.in
exports.db = function (){
    return new Sequelize('foo', 'reco', 'rita', {
        dialect: 'mysql',
        logging: false,
        "host": "localhost",
        // https://stackoverflow.com/questions/30811228/sequelize-single-instance-not-working-after-module-exports
        pool: {
            max: 50,
            min: 0,
            idle: 1000000
        },
    })
}
exports.id = function(){
    var ulid = require("ulid")
    return ulid.ulid()
}
exports.formatDate =  function (input){
    var day = ("0" + input.getDate()).slice(-2);
    var month = ("0" + (input.getMonth() + 1)).slice(-2);
    var today = input.getFullYear()+"-"+(month)+"-"+(day) ;
    return today;
}
