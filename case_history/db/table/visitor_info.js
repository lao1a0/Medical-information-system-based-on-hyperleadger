const visitor_infoDao = require("../dao/visitor_info");
class Visitor_info {
    constructor(id, name,idNum,tel,workplace) {
        this.id = id;
        this.name=name;
        this.idNum=idNum;
        this.tel=tel;
        this.workplace=workplace;
    }
    insert(callback) {
        visitor_infoDao.add(this, function (result) {
            callback(result);
        })
    }
    update(callback) {
        visitor_infoDao.update(this, function (result) {
            callback(result);
        });
    }
}
function queryId(id,callback) {
    visitor_infoDao.queryId(id, function (result) {
        if (result) {
            var doctor = new Visitor_info(result.data[0].id, result.data[0].name,result.data[0].idNum, result.data[0].tel,result.data[0].workplace);
            callback(doctor);
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    Visitor_info: Visitor_info,
    queryId: queryId,
}