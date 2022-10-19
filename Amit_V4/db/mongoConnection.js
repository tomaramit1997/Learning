const { default: mongoose } = require('mongoose');
const mongooose = require('mongoose'),
      dbConfig = require('config'),
      util = require('util');
const { BaseException } = require('../exceptions/index');
const schemaSuit = require('../schema/schema-suit');

// function getDbCredentials(){
//     let config = dbConfig.get('db.mongo');
//     return {
//         host : config.host,
//         url : config.url,
//         dbname : config.dbname,
//         username : config.username,
//         password : config.password,
//         port : config.port,
//         options : config.options
//     }
// }
module.exports = async function(done){
        // const dbConnect = getDbCredentials();
        //const mongoooseUrl = dbConnect.url;
        const mongoooseUrl = dbConfig.get('db.mongo.url');
        const options = {
            // reconnectInterval: 10000,
            // reconnectTries: Number.MAX_VALUE,
            // autoReconnect: true,
            // useNewUrlParser: true,
            // useCreateIndex : true,
            minPoolSize: 10,
            autoIndex: false,
        };
        try{
            // await mongooose.connect(mongoooseUrl, options);
            await mongooose.connect(mongoooseUrl, {autoIndex: false});
            done();
        }
        catch(error){
            throw new BaseException('Mongo Connection Exception occured mongoConnection.js');
        }
    }