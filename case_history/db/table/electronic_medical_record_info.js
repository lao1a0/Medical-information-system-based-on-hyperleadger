const electronic_medical_record_dao = require("../dao/electronic_medical_record_info");
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
class Electronic_medical_record {
    constructor(id,patientId,doctorId,createTime,section) {
        this.id=id;
        this.patientId=patientId;
        this.doctorId=doctorId;
        this.createTime=createTime;
        this.section=section;
    }
    insert(callback) {
        electronic_medical_record_dao.add(this, function (result) {
            callback(result);
        })
    }
}
function queryIdPatient(id,callback) {
    electronic_medical_record_dao.queryIdPatient(id, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid
                    }
                }
            }

            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryIdPatientAll(callback) {
    electronic_medical_record_dao.queryIdPatientAll(function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname":DES3.decrypt( result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid
                    }
                }
            }

            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryIdPatientAllChange(id,callback) {
    electronic_medical_record_dao.queryIdPatientAllChange(id,function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname":DES3.decrypt( result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid,
                        "ahiStatus": (result.data[i].status==null ? "":DES3.decrypt(result.data[i].status,CNT.KEY))
                    }
                }
            }

            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryIdcreateTime(param,callback) {
    electronic_medical_record_dao.queryIdcreateTime(param, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryTel(tel,callback) {
    electronic_medical_record_dao.queryTel(tel, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function queryTelChange(param,callback) {
    electronic_medical_record_dao.queryTelChange(param, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid,
                        "ahiStatus": (result.data[i].status==null ? "":DES3.decrypt(result.data[i].status,CNT.KEY))
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function querySection(section,callback) {
    electronic_medical_record_dao.querySection(section, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid
                    }
                }
            }
            callback(emrDao);
        } else {
            callback(undefined);
        }
    });
}
function querySectionChange(param,callback) {
    electronic_medical_record_dao.querySectionChange(param, function (result) {
        if (result) {
            let emrDao=[]
            for(let i=0;i<result.data.length;++i)
            {
                emrDao[i]={
                    key: i,
                    value: {
                        "pname": DES3.decrypt(result.data[i].pname,CNT.KEY),
                        "age": DES3.decrypt(result.data[i].age,CNT.KEY),
                        "sex": DES3.decrypt(result.data[i].sex,CNT.KEY),
                        "idNum": DES3.decrypt(result.data[i].idNum,CNT.KEY),
                        "birth": DES3.decrypt(result.data[i].birth,CNT.KEY),
                        "tel": DES3.decrypt(result.data[i].tel,CNT.KEY),
                        "company": DES3.decrypt(result.data[i].company,CNT.KEY),
                        "residence": DES3.decrypt(result.data[i].residence,CNT.KEY),
                        "dname": DES3.decrypt(result.data[i].dname,CNT.KEY),
                        "hospital": DES3.decrypt(result.data[i].hospital,CNT.KEY),
                        "section": DES3.decrypt(result.data[i].section,CNT.KEY),
                        "rank": DES3.decrypt(result.data[i].rank,CNT.KEY),
                        "dtel": DES3.decrypt(result.data[i].dtel,CNT.KEY),
                        "createTime": result.data[i].createTime,
                        "pid": result.data[i].pid,
                        "did": result.data[i].did,
                        "eid": result.data[i].eid,
                        "ahiStatus": (result.data[i].status==null ? "":DES3.decrypt(result.data[i].status,CNT.KEY))
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
    Electronic_medical_record: Electronic_medical_record,
    queryIdcreateTime: queryIdcreateTime,
    queryIdPatient: queryIdPatient,
    queryIdPatientAll:queryIdPatientAll,
    queryTel:queryTel,
    querySection:querySection,
    queryIdPatientAllChange:queryIdPatientAllChange,
    queryTelChange:queryTelChange,
    querySectionChange:querySectionChange
}