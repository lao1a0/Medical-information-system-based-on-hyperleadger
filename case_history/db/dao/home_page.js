var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/home_page');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var Home_page = {
    queryHospital: function (hname,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryHospital,hname,function (err, result) {
                console.log(err)
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryHospital',
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
    queryPatient: function (pid,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryPatient,[pid,pid],function (err, result) {
                if (result&&result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryPatient',
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
    queryDoctor: function (did,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryDoctor,[did,did],function (err, result) {
                if (result&&result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryDoctor',
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
    queryAccessor: function (vid,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAccessor,vid,function (err, result) {
                if (result&&result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryAccessor',
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
module.exports = Home_page;