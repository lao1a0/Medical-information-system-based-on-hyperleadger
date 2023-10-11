var mysql = require('mysql');
var mysqlconfig = require('../config');
var poolextend = require('../poolextend');
var sql = require('../sql/user_sql_string');
var pool = mysql.createPool(poolextend({}, mysqlconfig));

var UserDao = {
    queryemail: function (email, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryemail, email, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result.length !=0) {
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
    queryId: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryid, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryid',
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
    delete_user: function (user_type, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.delete_user, user_type, function (err, result) {
                console.log(err)
                if (result) {
                    result = {'delete':result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    delete_user_one: function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.delete_user_one, id, function (err, result) {
                if (result) {
                    result = {'delete_one':result.affectedRows};
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    queryId_hospital:function (id, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryid_hospital, id, function (err, result) {
                if (result.length !=0) {
                    var _result = result;
                    result = {
                        result: 'queryId_hospital',
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
    add: function (param, callback) {
        pool.getConnection(function (err, connection) {
                connection.query(sql.insert, [param.id,param.username, param.password, param.tel, param.email,param.user_type],function (err, result) {
                    if (result) {
                        result = 'success';
                    }
                    if(err)
                        console.log(err)
                    connection.release();
                    callback(result);
                });
        });
    },
    update: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.update, [param.username, param.password, param.tel, param.email,param.user_type,param.id],function (err, result) {
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
    queryUser:function (user_type, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryUser, user_type,function (err, result) {
                console.log(err)
                if (result) {
                    var _result = result;
                    result = {
                        result: 'queryUser',
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
    queryAllType:function (callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAllType,function (err, result) {
                result=JSON.parse(JSON.stringify(result));
                let keylist=["patient","accessor","doctor","hospital"]
                if (result) {
                    let _result = {};
                    for(let i in result)
                    {
                        _result[keylist[i]]=result[i].countType;
                    }

                    result =  _result
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    updatePwd:function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updatePwd, [param.password, param.id],function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result.affectedRows > 0) {
                    result = 'updatePwd';
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    },
    updateNoPwd: function (param, callback) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.updateNoPwd, [param.username, param.tel, param.email,param.id],function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result.affectedRows > 0) {
                    result = 'updateNoPwd';
                } else {
                    result = undefined;
                }
                connection.release();
                callback(result);
            });
        });
    }
};
module.exports = UserDao;