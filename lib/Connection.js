"use strict";
class Connection {
  constructor(host,port,dbName) {
    this.host=host;
    this.port=port;
    this.dbName=dbName;
    //------------------
    let mongo = require('mongodb');
    let Server = mongo.Server;
    let Db = mongo.Db;
    let BSON = mongo.BSONPure;
    let ObjectID = mongo.ObjectID;
    //-----------------------
    _this.server = new Server(host, port, {auto_reconnect: true});
    this.db = new Db(dbName, server, {safe: true});
  }

  open(){
    let _this = this;
    return new Promise(function(resolve, reject) {
      _this.db.open(function (err, db) {
        if (!err) {
          console.log(`Connected to "${dbName}" database`);
          resolve(db);
        }else {
          console.log(`Did Not Connect to "${dbName}" database`);
          console.log(`Because: ${err}`);
          reject(err);
        }
      });
    });
  }
  
}

module.exports = Connection;
