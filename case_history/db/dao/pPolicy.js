var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/pPolicy_info');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var pPolicy_info = {
    add: function (pid, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert,pid,function (err, result) {
                if (result) {
                    result = 'success';
                }
                connection.release();
                callback(result);
            });
        });
    },
    updateD: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateD, [param.pClassD,param.pDetialD,param.pid],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.affectedRows > 0) {
                        result = 'updateD';
                    } else {
                        result = undefined;
                    }
                    connection.release();
                    callback(result);
                });
        });
    },
    queryD: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryD, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryD',
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
    updateV: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateV, [param.pClassV,param.pDetialV,param.pid],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.affectedRows > 0) {
                        result = 'updateV';
                    } else {
                        result = undefined;
                    }
                    connection.release();
                    callback(result);
                });
        });
    },
    queryV: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryV, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryV',
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
    queryAll: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAll, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
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
};
module.exports = pPolicy_info;