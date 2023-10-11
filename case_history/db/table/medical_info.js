const medical_infoDao = require("../dao/medical_info");
const userDao = require("../dao/userdao");
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
class Medical_info {
    constructor(id, name, unit, price, prescription, middleClass) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.prescription = prescription;
        this.middleClass = middleClass;
    }
}
function insert(param,callback) {
    medical_infoDao.myinsert(param,function (result) {
          callback(result)
    });
}
function query(callback) {
    medical_infoDao.query(function (result) {
        try {
            if(result)
            {
                let result_=[]
                for(let i=0;i<result.data.length;++i)
                {
                    result_[i]= {
                        key: i,
                        value:{
                            "id":result.data[i].id,
                            "name":DES3.decrypt(result.data[i].name,CNT.KEY),
                            "unit":DES3.decrypt(result.data[i].unit,CNT.KEY),
                            "price":DES3.decrypt(result.data[i].price,CNT.KEY),
                            "prescription":DES3.decrypt(result.data[i].prescription,CNT.KEY),
                            "middleClass":DES3.decrypt(result.data[i].middleClass,CNT.KEY)
                        }
                    }
                }
                callback(result_);
            }else{
                callback(undefined);
            }
        } catch (e) {
            console.log(e)
        }
    });
}
function queryAll(middleClass,callback) {
    medical_infoDao.queryAll(middleClass,function (result) {
        try {
            if(result)
            {
                let result_=[]
                for(let i=0;i<result.data.length;++i)
                {
                    result_[i]= {
                        key: i,
                        value:{
                            "id":result.data[i].id,
                            "name":DES3.decrypt(result.data[i].name,CNT.KEY),
                            "unit":DES3.decrypt(result.data[i].unit,CNT.KEY),
                            "price":DES3.decrypt(result.data[i].price,CNT.KEY),
                            "prescription":DES3.decrypt(result.data[i].prescription,CNT.KEY),
                            "middleClass":DES3.decrypt(result.data[i].middleClass,CNT.KEY)

                        }
                    }
                }
                callback(result_);
            }else{
                callback(undefined);
            }

        } catch (e) {
           console.log(e)
        }
    });
}
function queryName(name,callback) {
    medical_infoDao.queryName(name,function (result) {
         try {
            if(result)
            {
                let result_=[]
                for(let i=0;i<result.data.length;++i)
                {
                    result_[i]= {
                        key: i,
                        value:{
                            "id":result.data[i].id,
                            "name":DES3.decrypt(result.data[i].name,CNT.KEY),
                            "unit":DES3.decrypt(result.data[i].unit,CNT.KEY),
                            "price":DES3.decrypt(result.data[i].price,CNT.KEY),
                            "prescription":DES3.decrypt(result.data[i].prescription,CNT.KEY),
                            "middleClass":DES3.decrypt(result.data[i].middleClass,CNT.KEY)

                        }
                    }
                }
                callback(result_);
            }else{
                callback(undefined);
            }

        } catch (e) {
           console.log(e)
        }
    });
}
function deleteMedical(callback) {
    medical_infoDao.deleteMedical(function (result) {
        if (result) {
            callback(result);
        } else {
            callback(undefined);
        }
    });
}
async function deleteMedicalOne(idList, callback) {
    for (let i in idList) {
        await medical_infoDao.deleteMedicalOne(idList[i], function (result) { });
    }
    callback({"deleteMedicalOne": idList.length});
}
module.exports = {
    Medical_info: Medical_info,
    queryAll: queryAll,
    queryName:queryName,
    query:query,
    insert:insert,
    deleteMedical:deleteMedical,
    deleteMedicalOne:deleteMedicalOne
}