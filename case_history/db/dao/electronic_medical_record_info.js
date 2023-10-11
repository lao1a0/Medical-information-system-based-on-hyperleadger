var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/electronic_medical_record');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var Electronic_medical_record = {
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert, [param.id,param.patientId,param.doctorId,param.createTime,param.section],function (err, result) {
                if(err) console.log(err)
                if (result) {
                    result = 'insert';
                }
                connection.release();
                callback(result);
            });
        });
    },
    queryIdPatient: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryIdPatient, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryIdPatient',
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
    queryIdPatientAll: function (callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryIdPatientAll,function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryIdPatientAll',
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
    queryIdPatientAllChange: function (id,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryIdPatientAllChange,id,function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryIdPatientAllChange',
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
    queryIdcreateTime: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryIdcreateTime, [param.pid,param.createTime], function (err, result) {
                if (result.length>0&&result!=undefined) {
                    var _result = result;
                    result = {
                        result: 'queryIdcreateTime',
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
    queryTel: function (tel, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryTel,tel, function (err, result) {
                if (result.length>0&&result!=undefined) {
                    var _result = result;
                    result = {
                        result: 'queryTel',
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
    queryTelChange: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryTelChange,[param.vid,param.tel], function (err, result) {
                if (result.length>0&&result!=undefined) {
                    var _result = result;
                    result = {
                        result: 'queryTelChange',
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
    querySection: function (section, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.querySection,section, function (err, result) {
                if (result.length>0&&result!=undefined) {
                    var _result = result;
                    result = {
                        result: 'querySection',
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
    querySectionChange: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.querySectionChange,[param.vid,param.section], function (err, result) {
                if (result.length>0&&result!=undefined) {
                    var _result = result;
                    result = {
                        result: 'querySectionChange',
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

module.exports = Electronic_medical_record;