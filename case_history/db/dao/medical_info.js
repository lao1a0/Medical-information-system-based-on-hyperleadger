let mysql = require('mysql');
let mysqlconfig = require('../config');
let poolextend = require('../poolextend');
let sql = require('../sql/medical_info_sql_string');
let pool = mysql.createPool(poolextend({}, mysqlconfig));

let Medical_info = {
    queryAll: function (middleClass, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAll, middleClass, function (err, result) {
                if (result.length != 0) {
                    let _result = result;
                    result = {
                        result: 'queryAll',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    queryName: function (name, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryName, (name==undefined?"":name), function (err, result) {
                if(err) console.log(err)
                if (result.length != 0) {
                    let _result = result;
                    result = {
                        result: 'queryName',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    query: function (callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.query, function (err, result) {
                if (result.length != 0) {
                    let _result = result;
                    result = {
                        result: 'query',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    myinsert: function (param,callback){
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert,[param.id,param.name,param.unit,param.price,param.prescription,param.middleClass] ,function (err, result) {
                if (result) {
                    result = 'success';
                }
                if (err) console.log(err);
                connection.release();
                callback(result);
            });
        });
    },
    deleteMedical: function (callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.deleteMedical, function (err, result) {
                console.log(result)
                if (result) {
                    result = {'deleteMedical': result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    deleteMedicalOne: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.deleteMedicalOne, id, function (err, result) {
                if (result) {
                    result = {'deleteMedicalOne': result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
};
module.exports = Medical_info;