var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/access_history_info');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var Access_history_info = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert, [param.id,param.mid,param.vid,param.vtype,param.time,param.status],function (err, result) {
                if(err)
                    console.log(err)
                if (result) {
                    result = 'insert';
                }
                connection.release();
                callback(result);
            });
        });
    },
    updateStatus: function (param,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateStatus, [param.status,param.mid,param.vid], function (err, result) {
                if (result) {
                    var _result = result;
                    result = {
                        result: 'updateStatus',
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
    updateStatusById: function (param,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateStatusById, param, function (err, result) {
                if(err) console.log(err)
                if (result) {
                    var _result = result;
                    result = {
                        result: 'updateStatusById',
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
    queryDoctor: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryDoctor, id, function (err, result) {
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
    queryDoctorPass: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryDoctorPass, id, function (err, result) {
                if (result&&result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryDoctorPass',
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
    queryDoctorNotPass: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryDoctorNotPass, id, function (err, result) {
                if (result&&result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryDoctorNotPass',
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
    queryId: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryId, [param.mid,param.vid], function (err, result) {
                if (result&&result.length !=0) {
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
    deleteAllaccessHistory:function (id,callback){
        pool.getConnection(function (err, connection) {
            connection.query(sql.deleteAllaccessHistory, id, function (err, result) {
                if (result) {
                    result = {'deleteAllaccessHistory': result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    }
};

module.exports = Access_history_info;