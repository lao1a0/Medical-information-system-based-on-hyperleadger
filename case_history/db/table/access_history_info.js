const access_history_info_dao = require("../dao/access_history_info");
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
class Access_history_info {
    constructor(id,mid,vid,vtype,time,status) {
        this.id=id;
        this.mid=mid;
        this.vid=vid;
        this.vtype=vtype;
        this.time=time;
        this.status=status
    }
    insert(callback) {
        access_history_info_dao.add(this, function (result) {
            callback(result);
        })
    }
}
function updateStatus(param,callback) {
    access_history_info_dao.updateStatus(param, function (result) {
        if (result) {
            callback(true);
        } else {
            callback(undefined);
        }
    });
}
function updateStatusById(param,callback) {
    access_history_info_dao.updateStatusById(param, function (result) {
        if (result) {
            callback(true);
        } else {
            callback(undefined);
        }
    });
}
function deleteAllaccessHistory(id,callback) {
    access_history_info_dao.deleteAllaccessHistory(id, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
function queryId(param,callback) {
    access_history_info_dao.queryId(param, function (result) {
        if (result) {
            let emrDao=[];
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "status":DES3.decrypt(result.data[i].status,CNT.KEY),
                        "time": result.data[i].time,
                        "pidNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "vid": result.data[i].vid,
                        "mid": result.data[i].mid,
                        "id": result.data[i].id,
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryDoctor(id,callback) {
    access_history_info_dao.queryDoctor(id, function (result) {
        if (result) {
            let emrDao=[];
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "status":DES3.decrypt(result.data[i].status,CNT.KEY),
                        "time": result.data[i].time,
                        "vtype": DES3.decrypt(result.data[i].vtype,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "name": DES3.decrypt(result.data[i].name,CNT.KEY),
                        "pidNum": DES3.decrypt(result.data[i].pidNum,CNT.KEY),
                        "aid": result.data[i].aid,
                        "pid": result.data[i].pid,
                        "vid": result.data[i].vid,
                        "eid": result.data[i].eid,
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryDoctorPass(id,callback) {
    access_history_info_dao.queryDoctorPass(id, function (result) {
        if (result) {
            let emrDao=[];
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "status":DES3.decrypt(result.data[i].status,CNT.KEY),
                        "time": result.data[i].time,
                        "vtype": DES3.decrypt(result.data[i].vtype,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "name": DES3.decrypt(result.data[i].name,CNT.KEY),
                        "pidNum": DES3.decrypt(result.data[i].pidNum,CNT.KEY),
                        "aid": result.data[i].aid,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid,
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryDoctorNotPass(id,callback) {
    access_history_info_dao.queryDoctorNotPass(id, function (result) {
        if (result) {
            let emrDao=[];
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "status":DES3.decrypt(result.data[i].status,CNT.KEY),
                        "time": result.data[i].time,
                        "vtype": DES3.decrypt(result.data[i].vtype,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "name": DES3.decrypt(result.data[i].name,CNT.KEY),
                        "pidNum": DES3.decrypt(result.data[i].pidNum,CNT.KEY),
                        "aid": result.data[i].aid,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid,
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    Access_history_info: Access_history_info,
    queryDoctor: queryDoctor,
    queryId: queryId,
    queryDoctorNotPass: queryDoctorNotPass,
    queryDoctorPass:queryDoctorPass,
    updateStatus:updateStatus,
    deleteAllaccessHistory:deleteAllaccessHistory,
    updateStatusById:updateStatusById
}