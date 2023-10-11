const doctor_infoDao = require("../dao/doctor_info");
const userDao = require("../dao/userdao");
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
class Doctor_info {
    constructor(id, name, age, sex, idNum, tel, hospital, description, rank, section) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.idNum = idNum;
        this.tel = tel;
        this.description = description;
        this.hospital = hospital;
        this.rank = rank;
        this.section = section;
    }

    insert(callback) {
        doctor_infoDao.add(this, function (result) {
            callback(result);
        })
    }

    update(callback) {
        doctor_infoDao.update(this, function (result) {
            callback(result);
        });
    }
}

function updateExpRS(param, callback) {
    doctor_infoDao.updateExpRS(param, function (result) {
        if (result) {
            callback(result);
        } else callback(undefined);
    });
}

function updateExpD(param, callback) {
    doctor_infoDao.updateExpD(param, function (result) {
        if (result) {
            callback(result);
        } else callback(undefined);
    });
}

function queryId(id, callback) {
    doctor_infoDao.queryId(id, function (result) {
        if (result) {
            var doctor = new Doctor_info(result.data[0].id, result.data[0].name, result.data[0].age,
                result.data[0].sex, result.data[0].idNum, result.data[0].tel,
                result.data[0].hospital, result.data[0].description, result.data[0].rank, result.data[0].section);
            callback(doctor);
        } else {
            callback(undefined);
        }
    });
}

function queryHospital(hname, callback) {
    doctor_infoDao.queryHospital(hname, function (result) {
        if (result) {
            let user = [];
            for (let i = 0; i < result.data.length; ++i) {
                user[i] = {
                    key: "user" + i,
                    value: {
                        "id": result.data[i].id,
                        "email": DES3.decrypt(result.data[i].email,CNT.KEY),
                        "name": DES3.decrypt(result.data[i].name,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "rank":DES3.decrypt( result.data[i].rank,CNT.KEY),
                        "section":DES3.decrypt( result.data[i].section,CNT.KEY)
                    }
                }
            }
            callback(user);
        } else {
            callback(undefined);
        }
    });
}

function queryemail(email, callback) {
    doctor_infoDao.queryemail(email, function (result) {
        if (result) {
            let user = [];
            for (let i = 0; i < result.data.length; ++i) {
                user[i] = {
                    "key": "user" + i,
                    "value": {
                        "id": result.data[i].id,
                        "email": DES3.decrypt(result.data[i].email,CNT.KEY),
                        "name": DES3.decrypt(result.data[i].name,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "hospital":DES3.decrypt(result.data[i].hospital,CNT.KEY)
                    }
                }
            }
            callback(user);
        } else {
            callback(undefined);
        }
    });
}

function delete_doctor(hname, callback) {
    doctor_infoDao.delete_doctor(hname, function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}

function delete_doctor_one(idList, callback) {
    let count = 0;
    for (let i in idList) {
        doctor_infoDao.delete_doctor_one(idList[i], function (result) {
            if (result) {
                count = count + result["delete_doctor_one"];
            } else {
                callback(undefined)
            }
        });
    }
    callback({"delete_doctor_one": idList.length});
}

module.exports = {
    Doctor_info: Doctor_info,
    queryId: queryId,
    updateExpD: updateExpD,
    updateExpRS: updateExpRS,
    queryHospital: queryHospital,
    queryemail: queryemail,
    delete_doctor: delete_doctor,
    delete_doctor_one: delete_doctor_one
}