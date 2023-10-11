var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/doctor_info_sql_string');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var Doctor_info = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert, [param.id, param.name, param.age, param.sex, param.idNum, param.tel, param.hospital, param.description, param.rank, param.section], function (err, result) {
                if (result) {
                    result = 'success';
                }
                if (err) console.log(err);
                connection.release();
                callback(result);
            });
        });
    },
    updateExpRS: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateExpRS, [param.name, param.age, param.sex, param.idNum, param.tel, param.hospital, param.id],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result.affectedRows > 0) {
                        result = 'updateExpRS';
                    } else {
                        result = undefined;
                    }
                    connection.release();
                    callback(result);
                });
        });
    },
    updateExpD: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateExpD, [param.name, param.age, param.sex, param.idNum, param.tel, param.hospital, param.rank, param.section, param.id],
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
    update: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.update, [param.name, param.age, param.sex, param.idNum, param.tel, param.hospital, param.description, param.rank, param.section, param.id],
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
    queryId: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryId, id, function (err, result) {
                if (result.length != 0) {
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
    queryHospital: function (hname, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryHospital, hname, function (err, result) {
                if (err) console.log(err)
                if (result) {
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
    queryemail: function (email, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryemail, (email==undefined?"":email), function (err, result) {
                if (err) console.log(err)
                if (result) {
                    var _result = result;
                    result = {
                        result: 'queryemail',
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
    delete_doctor: function (user_type, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.delete_doctor, user_type, function (err, result) {
                if (result) {
                    result = {'delete_doctor': result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    delete_doctor_one: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.delete_doctor_one, id, function (err, result) {
                if (result) {
                    result = {'delete_doctor_one': result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
};
module.exports = Doctor_info;