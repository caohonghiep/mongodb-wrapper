"use strict";
let mongo = require('mongodb');
let Server = mongo.Server;
let Db = mongo.Db;
let BSON = mongo.BSONPure;
let ObjectID = mongo.ObjectID;
class DataAccess {
    constructor(connection, collectionName) {
        this._connection=connection;
        this._db =connection.db;
        this._collectionName=collectionName;
    }


    findById(id) {
        let db = this._db;
        let name = this._collectionName;
        db.collection(name, function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                return item;
            });
        });
    };

    findAll(){
        let db = this._db;
        let name = this._collectionName;
        db.collection(name, function(err, collection) {
            collection.find().toArray(function(err, items) {
                return items;
            });
        });
    };

    add(item) {
        let db = this._db;
        let name = this._collectionName;
        db.collection(name, function(err, collection) {
            collection.insert(item, {safe:true}, function(err, result) {
                if (err) {
                    onsole.log('Error add data: ' + err);
                } else {
                    return result[0];
                }
            });
        });
    }

    update(id, data) {
        let db = this._db;
        let name = this._collectionName;
        delete data._id;
        db.collection(name, function(err, collection) {
            collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error updating data: ' + err);
                } else {
                    return result;
                }
            });
        });
    }

    delete(id) {
        let db = this._db;
        let name = this._collectionName;
        db.collection(name, function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error deleting data: ' + err);
                } else {
                    return result;
                }
            });
        });
    }
}
module.exports = DataAccess;