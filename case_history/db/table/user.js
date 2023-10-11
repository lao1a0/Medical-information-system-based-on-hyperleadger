var userDao = require('../dao/userdao');
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
class User {
    constructor(id, email, username,password,tel,user_type) {
        this.id = id;
        this.email=email;
        this.username=username;
        this.password=password;
        this.tel = tel;
        this.user_type=user_type;
    }
    insert(callback) {
        userDao.add(this, function (result) {
            callback(result);
        })
    }
    update(callback) {
        userDao.update(this, function (result) {
            callback(result);
        });
    }
}
function updatePwd(param,callback){
    userDao.updatePwd(param,function (result){
        if(result)
        {
            callback(result);
        }else callback(undefined)
    })
}
function updateNoPwd(param,callback) {
    userDao.updateNoPwd(param, function (result) {
        callback(result);
    });
}
function queryAllType(callback){
    userDao.queryAllType(function (result){
        if(result)
        {
            callback(result);
        }else callback(undefined)
    })
}
function delete_user(user_type, callback) {
    userDao.delete_user(user_type, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
function delete_user_one(idList, callback) {
    let count=0;
    for(let i in idList)
    {
        userDao.delete_user_one(idList[i],function (result){
            if(result)
            {
                count = count + result["delete_one"];
            }else{
                callback(undefined)
            }
        });
    }
    callback({"delete_one":idList.length});
}
function queryemail(email, callback) {
    userDao.queryemail(email, function (result) {
        if (result != undefined) {
            var user = new User(result.data[0].id, result.data[0].email, result.data[0].username, result.data[0].password, result.data[0].tel,result.data[0].user_type);
            callback(user);
        } else {
            callback(undefined);
        }
    });
}
function queryId(id, callback) {
    userDao.queryId(id, function (result) {
        if (result != undefined) {
            var user = new User(result.data[0].id, result.data[0].email, result.data[0].username, result.data[0].password, result.data[0].tel,result.data[0].user_type);
            callback(user);
        } else {
            callback(undefined);
        }
    });
}
function queryId_hospital(id, callback) {
    userDao.queryId_hospital(id, function (result) {
        if (result != undefined) {
            var user = new User(result.data[0].id, result.data[0].email, result.data[0].username, result.data[0].password, result.data[0].tel,result.data[0].user_type);
            callback(user);
        } else {
            callback(undefined);
        }
    });
}
function queryUser(user_type,callback) {
    userDao.queryUser(user_type, function (result) {
        if (result != undefined) {
            let user=[];
            for(let i =0;i<result.data.length;++i)
            {
                user[i]= {
                    key: "user" + i,
                    value: {
                        "id": result.data[i].id,
                        "email": DES3.decrypt(result.data[i].email, CNT.KEY),
                        "username": DES3.decrypt(result.data[i].username, CNT.KEY),
                        "password": DES3.decrypt(result.data[i].password, CNT.KEY),
                    }
                }
                if(user_type=="6O573tURyV4=")
                {
                    user[i]["value"]["tel"]=DES3.decrypt(result.data[i].ptel,CNT.KEY)
                }else if(user_type=="bMYFAuW1clycnbVAM3PZ/A==")
                {
                    user[i]["value"]["tel"]=DES3.decrypt(result.data[i].vtel,CNT.KEY)
                }
                else
                {
                    user[i]["value"]["tel"]=DES3.decrypt(result.data[i].utel,CNT.KEY)
                }
            }
            callback(user);
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    User: User,
    queryemail: queryemail,
    queryId:queryId,
    queryId_hospital:queryId_hospital,
    queryUser:queryUser,
    delete_user:delete_user,
    delete_user_one:delete_user_one,
    updatePwd:updatePwd,
    queryAllType:queryAllType,
    updateNoPwd:updateNoPwd
}