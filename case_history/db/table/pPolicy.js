const pPolicy_infodao = require("../dao/pPolicy");
class pPolicy_info {
    constructor(pid, pClassD,pDetialD,pClassV,pDetialV) {
        this.pid = pid;
        this.pClassD=pClassD;
        this.pDetialD=pDetialD;
        this.pClassV=pClassV;
        this.pDetialV=pDetialV;
    }
}
function  insert(pid,callback) {
    pPolicy_infodao.add(pid, function (result) {
        callback(result);
    })
}
function queryD(pid,callback) {
    pPolicy_infodao.queryD(pid, function (result) {
        if (result) {
            var patient = {
                "pid": result.pid,
                "pClassD":result.pClassD,
                "pDetialD":result.pDetialD,
            }
            callback(patient);
        } else {
            callback(undefined);
        }
    });
}
function queryV(pid,callback) {
    pPolicy_infodao.queryV(pid, function (result) {
        if (result) {
            var patient = {
                "pid": result.pid,
                "pClassV":result.pClassV,
                "pDetialV":result.pDetialV,
            }
            callback(patient);
        } else {
            callback(undefined);
        }
    });
}
function queryAll(pid,callback) {
    pPolicy_infodao.queryAll(pid, function (result) {
        if (result) {
            var patient = {
                "pClassV":result.data[0].pClassV,
                "pDetialV":result.data[0].pDetialV,
                "pClassD":result.data[0].pClassD,
                "pDetialD":result.data[0].pDetialD,
            }
            callback(patient);
        } else {
            callback(undefined);
        }
    });
}
function updateD(param, callback) {
    pPolicy_infodao.updateD(param, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
function updateV(param, callback) {
    pPolicy_infodao.updateV(param, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
function updateAll(id, callback) {
    pPolicy_infodao.updateAll(id, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    pPolicy_info: pPolicy_info,
    queryV: queryV,
    queryD: queryD,
    queryAll: queryAll,
    updateD: updateD,
    updateV: updateV,
    insert:insert
}