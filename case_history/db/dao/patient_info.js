var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/patient_info_sql_string');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var Patient_info = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert, [param.id,param.name,param.age,param.sex,param.idNum,param.tel,param.residence,param.company,param.birth],function (err, result) {
                if (result) {
                    result = 'success';
                }
                connection.release();
                callback(result);
            });
        });
    },
    update: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.update, [param.name,param.age,param.sex,param.idNum,param.tel,param.residence,param.company,param.birth, param.id],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.affectedRows > 0) {
                        result = 'update';
                    } else {
                        result = undefined;
                    }
                    connection.release();
                    callback(result);
                });
        });
    },
    updateNoBNoI: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateNoBNoI, [param.name,param.age,param.sex,param.tel,param.residence,param.company, param.id],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.affectedRows > 0) {
                        result = 'updateNoBNoI';
                    } else {
                        result = undefined;
                    }
                    connection.release();
                    callback(result);
                });
        });
    },
    queryId: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryId, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryId',
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
};
module.exports = Patient_info;