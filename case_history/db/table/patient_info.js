const patient_infoDao = require("../dao/patient_info");
class Patient_info {
    constructor(id, name,age,sex,idNum,tel,residence,company,birth) {
        this.id = id;
        this.name=name;
        this.age=age;
        this.sex=sex;
        this.idNum=idNum;
        this.tel=tel;
        this.residence=residence;
        this.company=company;
        this.birth=birth;
    }
    insert(callback) {
        patient_infoDao.add(this, function (result) {
            callback(result);
        })
    }
}
function queryId(id,callback) {
    patient_infoDao.queryId(id, function (result) {
        if (result) {
            var patient = new Patient_info(result.data[0].id, result.data[0].name, result.data[0].age,
                result.data[0].sex, result.data[0].idNum, result.data[0].tel, result.data[0].residence, result.data[0].company, result.data[0].birth);
            callback(patient);
        } else {
            callback(undefined);
        }
    });
}
function update(param, callback) {
    patient_infoDao.update(param, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
function updateNoBNoI(param, callback) {
    patient_infoDao.updateNoBNoI(param, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    Patient_info: Patient_info,
    queryId: queryId,
    update: update,
    updateNoBNoI:updateNoBNoI
}