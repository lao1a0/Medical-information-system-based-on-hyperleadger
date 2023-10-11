var express = require('express');
const User = require("../db/table/user");
const doctor_ = require("../db/table/doctor_info");
const user_ = require("../db/table/user");
let pPolicy_ = require("../db/table/pPolicy");
const patient_ = require("../db/table/patient_info");
const visitor_ = require("../db/table/visitor_info");
let DES3=require("../fabric/des");
var router = express.Router();
let cpabe=require("../fabric/cpabe");
let format=require("string-format");
const path = require("path");
let CPABE_DECRYPT_DATA={};
let moment = require('moment');
let access_history_info_ = require("../db/table/access_history_info");
let UUID = require("uuid");
let myFunction=require("../constant/function");
let medical_ = require("../db/table/medical_info");
let CNT=require("../constant/constant");
router.get('/', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            switch (req.session.userinfo.user_type) {
                case "patient": {
                    if(req.query.page)
                    {
                        switch (req.query.typePage)
                        {
                            case "pass":
                            {
                                access_history_info_.queryDoctorPass(req.session.userinfo.id,function (result) {
                                    if (result){
                                        myFunction.getPagingDataNormal(result,req.query.page,18,function (r) {
                                            return res.json(r);
                                        });
                                    }else return res.json({
                                        "flag":false
                                    });
                                });
                                break;
                            }
                            case "notPass":
                            {
                                access_history_info_.queryDoctorNotPass(req.session.userinfo.id,function (result) {
                                    if (result){
                                        myFunction.getPagingDataNormal(result,req.query.page,18,function (r) {
                                            return res.json(r);
                                        });
                                    }else return res.json({
                                        "flag":false
                                    });
                                });
                                break;
                            }
                            default:{
                                access_history_info_.queryDoctor(req.session.userinfo.id,function (result) {
                                    if (result){
                                        myFunction.getPagingDataNormal(result,req.query.page,18,function (r) {
                                            return res.json(r);
                                        });
                                    }else return res.json({
                                        "flag":false
                                    });
                                });
                            }
                        }
                    }else return res.render("./accessRecord/accessRecord_patient.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                    break;
                }
                case "doctor": {
                    return res.render("./accessRecord/accessRecord_doctor.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                }
                case "hospital": {
                    if(req.query.page)
                    {
                        switch (req.query.userType)
                        {
                            case "medical":
                            {
                                medical_.query(function (r) {
                                    myFunction.getPagingDataNormal(r,req.query.page,18,function (re_data) {
                                        return res.json(re_data);
                                    });
                                });
                                break;
                            }
                            case "policy":{
                                break;
                            }
                            default:
                            {
                                doctor_.queryHospital(DES3.encrypt(req.session.userinfo.username,CNT.KEY),function (result){
                                    myFunction.getPagingDataNormal(result,req.query.page,18,function (re_data) {
                                        re_data["username"] = req.session.userinfo.username;
                                        return res.json(re_data);
                                    });
                                });
                            }
                        }
                    }else return res.render("./accessRecord/accessRecord_hospital.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel,
                        "dataString": "",
                        "total": 1
                    });
                }
            }
        } else return res.render("error.html");
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/get_data', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            doctor_.queryHospital(DES3.encrypt(req.session.userinfo.username,CNT.KEY), function (result) {
                if (result) {
                    myFunction.getPagingDataNormal(result,req.body.page,18,function (r){
                        let re_data=r;
                        re_data["username"] = req.session.userinfo.username;
                        return res.json(re_data);
                    })
                } else return res.render("./accessRecord/accessRecord_hospital.html", {
                    "username": req.session.userinfo.username,
                    "email": req.session.userinfo.email,
                    "tel": req.session.tel,
                    "dataString": "",
                    "total": 1
                });
            });
        } else return res.render("error", {
            message: "未登录"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getMedicalAll', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            medical_.query(function (r) {
                myFunction.getPagingDataNormal(r,1,18,function (re_data) {
                    return res.json(re_data);
                });
            });
        } else return res.render("error", {
            message: "未登录"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteMedical', function (req, res) {
    try {
        if(req.body)
        {
            medical_.deleteMedical(function (result){
                if(result)
                {
                    return res.json({"status":result["deleteMedical"]})
                }else return res.render("error.html",{
                    message:"数据错误！！"
                });
            });
        }
        else return res.render("error.html",{
            message:"数据错误！！"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }

});
router.post('/deleteMedicalOne', function (req, res) {
    try {
        if(req.body)
        {
            medical_.deleteMedicalOne(req.body.idList,function (result){
                if(result)
                {
                    return res.json({"status":result["deleteMedicalOne"]})
                }else return res.render("error.html",{
                    message:"数据错误！！"
                });
            });
        }
        else return res.render("error.html",{
            message:"数据错误！！"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getAll', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
        User.queryAllType(function (result) {
            if (result) {
                return res.json({
                    "flag": true,
                    "data": result,
                })
            } else {
                return res.json({"flag": false});
            }
        });
    } else return res.render("error.html");
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/searchEmail', function (req, res) {
    try {
        if(req.body)
        {
            doctor_.queryemail(DES3.encrypt(req.body.email,CNT.KEY),function (result){
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                console.log(result)
                if(result.length>0)
                {
                    let re_data={};
                    for(let j=0;j<result.length;++j)
                    {
                        re_data[result[j].key]=result[j].value;
                    }
                    re_data["total"]=1;
                    re_data["username"] = req.session.userinfo.username;
                    return  res.json({
                        "flag":true,
                        "data":re_data})
                } else  return  res.json({
                    "flag":false})
            });
        }
        else return res.render("error.html",{
            message:"数据错误！！"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteUser', function (req, res) {
    try {
        if(req.body)
        {
            doctor_.delete_doctor(DES3.encrypt(req.session.userinfo.username,CNT.KEY),function (result){
                if(result)
                {
                    return res.json({"status":result["delete_doctor"]})
                }else return res.render("error.html",{
                    message:"数据错误！！"
                });
            });
        }
        else return res.render("error.html",{
            message:"数据错误！！"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteUserOne', function (req, res) {
    try {
        if(req.body)
        {
            user_.delete_user_one(req.body.idList,function (result){
                if(result)
                {
                    return res.json({"status":result["delete_doctor_one"]})
                }else return res.render("error.html",{
                    message:"数据错误！！"
                });
            });
        }
        else return res.render("error.html",{
            message:"数据错误！！"
        });
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getData', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            doctor_.queryId(req.body.user_id, function (ulist) {
                if (ulist) {
                    return res.json({
                        "flag": true,
                        "username": DES3.decrypt(ulist.name,CNT.KEY),
                        "age": DES3.decrypt(ulist.age,CNT.KEY),
                        "sex": DES3.decrypt(ulist.sex,CNT.KEY),
                        "idNum": DES3.decrypt(ulist.idNum,CNT.KEY),
                        "tel": DES3.decrypt(ulist.tel,CNT.KEY),
                        "hospital": DES3.decrypt(ulist.hospital,CNT.KEY),
                        "rank": DES3.decrypt(ulist.rank,CNT.KEY),
                        "section": DES3.decrypt(ulist.section,CNT.KEY),
                    });
                } else return res.json({
                    "flag": false
                });
            });
        } else return res.render("error.html");
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/changeData',function (req,res) {
    try {
        if (req.session.userinfo.is_login) {
            let param = {
                "id":req.body.user_id,
                "name":DES3.encrypt(req.body.user_data.change_name,CNT.KEY),
                "age":DES3.encrypt(req.body.user_data.change_age,CNT.KEY),
                "sex":DES3.encrypt(req.body.user_data.change_sex,CNT.KEY),
                "idNum":DES3.encrypt(req.body.user_data.change_ic,CNT.KEY),
                "tel":DES3.encrypt(req.body.user_data.change_tel,CNT.KEY),
                "hospital":DES3.encrypt(req.body.user_data.change_h,CNT.KEY),
                "rank":DES3.encrypt(req.body.user_data.change_rank,CNT.KEY),
                "section":DES3.encrypt(req.body.user_data.change_sect,CNT.KEY)
            }
            doctor_.updateExpD(param,function (result){
                console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result)
                if(result)
                {
                    access_history_info_.updateStatusById(req.body.user_id,function (r){
                        if(r)
                        {
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",r)
                        }
                        return res.json({"flag":"更新成功"});
                    });
                }else return res.json({"flag":"更新失败"});
            });
        } else return res.render("error.html");
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/insertOneData',function (req,res) {
    try {
        if (req.session.userinfo.is_login) {
            let param = {
                "id":UUID.v4(),
                "middleClass":DES3.encrypt(req.body.data.change_middleClass,CNT.KEY),
                "prescription":DES3.encrypt(req.body.data.change_prescription,CNT.KEY),
                "name":DES3.encrypt(req.body.data.change_name,CNT.KEY),
                "price":DES3.encrypt(req.body.data.change_price,CNT.KEY),
                "unit":DES3.encrypt(req.body.data.change_unit,CNT.KEY)
            }
            medical_.insert(param,function (result){
                if(result)
                {
                    return res.json({"flag":"添加成功"});
                }else return res.json({"flag":"添加失败"});
            });
        } else return res.render("error.html");
    } catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/decodeData',function (req,res) {
    try {
        pPolicy_.queryAll(req.body.pid,function (rForpid) {
            access_history_info_.queryId({"mid":req.body.eid,"vid":req.session.userinfo.id},function (ar) {
                if(ar&&Number(ar[0].value.status))
                {
                    // let arKey=ar[0].value.pidNum+ar[0].value.pidNum.slice(6,12);
                    // console.log(ar[0].value)
                    let arKey=req.body.pid.slice(0,24);
                    let reData={
                        "pname": DES3.decrypt(req.body.pname.trim(),arKey),
                        "psex": DES3.decrypt(req.body.psex.trim(),arKey),
                        "page": DES3.decrypt(req.body.page.trim(),arKey),
                        "pidNum": DES3.decrypt(req.body.pidNum.trim(),arKey),
                        "pbirth":  DES3.decrypt(req.body.pbirth.trim(),arKey),
                        "ptel":  DES3.decrypt(req.body.ptel.trim(),arKey),
                        "presidence":  DES3.decrypt(req.body.presidence.trim(),arKey),
                        "pcompany":  DES3.decrypt(req.body.pcompany.trim(),arKey),
                        "createTime": req.body.createTime.trim(),
                        "section": req.body.section.trim(),
                        "dname": DES3.decrypt(req.body.dname.trim(),arKey),
                        "healthCheckup":DES3.decrypt(req.body.healthCheckup.trim(),arKey),
                        "mainSuit":DES3.decrypt(req.body.mainSuit.trim(),arKey),
                        "anamnesis":DES3.decrypt(req.body.anamnesis.trim(),arKey),
                        "personalHistory":DES3.decrypt(req.body.personalHistory.trim(),arKey),
                        "familyHistory":DES3.decrypt(req.body.familyHistory.trim(),arKey),
                        "auxiliaryExamination":DES3.decrypt(req.body.auxiliaryExamination.trim(),arKey),
                        "westernDiagnostics":DES3.decrypt(req.body.westernDiagnostics.trim(),arKey),
                        "tcmDiagnosis":DES3.decrypt(req.body.tcmDiagnosis.trim(),arKey),
                        "diagnose":DES3.decrypt(req.body.diagnose.trim(),arKey),
                        "casesOfDetails":DES3.decrypt(req.body.casesOfDetails.trim(),arKey),
                        "medicalDetial":DES3.decrypt(req.body.medicalDetial.trim(),arKey),
                    };
                    CPABE_DECRYPT_DATA[req.body.eid.trim()]=reData;
                    return res.json({
                        "flag":true,
                        reData:reData
                    });
                }
                else if(req.body.tg==1)
                {
                    let ahi = new access_history_info_.Access_history_info(UUID.v4(),
                        req.body.eid,
                        req.session.userinfo.id,
                        DES3.encrypt(req.session.userinfo.user_type,CNT.KEY),
                        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
                        DES3.encrypt("1",CNT.KEY));
                    ahi.insert(function (r) {
                        return res.json(CPABE_DECRYPT_DATA[req.body.eid]);
                    });
                }
                else {
                    if(req.session.userinfo.user_type=="doctor")
                    {
                        myFunction.getTheMedicalDataAndCpabeDecrypt(req.session.userinfo.id,req.body,DES3.decrypt(rForpid.pClassD,CNT.KEY),DES3.decrypt(rForpid.pDetialD,CNT.KEY),function (r) {
                            if(r.flag)
                            {
                                let ahi = new access_history_info_.Access_history_info(UUID.v4(),
                                    req.body.eid,
                                    req.session.userinfo.id,
                                    DES3.encrypt(req.session.userinfo.user_type, CNT.KEY),
                                    moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
                                    DES3.encrypt("1", CNT.KEY));
                                ahi.insert(function (aar) {
                                    return res.json(r);
                                });
                            }
                            else
                            {
                                let ahi = new access_history_info_.Access_history_info(UUID.v4(),
                                    req.body.eid,
                                    req.session.userinfo.id,
                                    DES3.encrypt(req.session.userinfo.user_type,CNT.KEY),
                                    moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
                                    DES3.encrypt("0",CNT.KEY));
                                ahi.insert(function (r) {
                                });
                                return  res.json({
                                    "flag":false
                                })
                            }
                        });
                    }
                    else
                    {
                        myFunction.getTheMedicalDataAndCpabeDecrypt(req.session.userinfo.id,req.body,DES3.decrypt(rForpid.pClassV,CNT.KEY),DES3.decrypt(rForpid.pDetialV,CNT.KEY),function (r) {
                            let ahi = new access_history_info_.Access_history_info(UUID.v4(),
                                req.body.eid,
                                req.session.userinfo.id,
                                DES3.encrypt(req.session.userinfo.user_type,CNT.KEY),
                                moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
                                DES3.encrypt("0",CNT.KEY));
                            ahi.insert(function (r) {
                            });
                            return  res.json({
                                "flag":false
                            });
                        });
                    }

                }
            });
        });

    }catch (e) {
        let ahi = new access_history_info_.Access_history_info(UUID.v4(),
            req.body.eid,
            req.session.userinfo.id,
            DES3.encrypt(req.session.userinfo.user_type,CNT.KEY),
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),
            DES3.encrypt("0",CNT.KEY));
        ahi.insert(function (r) {
            return  res.json({
                "flag":false
            })
        });
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getHistoryData',function (req,res) {
    try {
        switch (req.body.typePage)
        {
            case "pass":
            {
                access_history_info_.queryDoctorPass(req.session.userinfo.id,function (result) {
                    if (result){
                        myFunction.getPagingDataNormal(result,1,18,function (r) {
                            return res.json(r);
                        });
                    }else return res.json({
                        "flag":false
                    });
                });
                break;
            }
            case "notPass":
            {
                access_history_info_.queryDoctorNotPass(req.session.userinfo.id,function (result) {
                    if (result){
                        myFunction.getPagingDataNormal(result,1,18,function (r) {
                            return res.json(r);
                        });
                    }else return res.json({
                        "flag":false
                    });
                });
                break;
            }
            default:{
                access_history_info_.queryDoctor(req.session.userinfo.id,function (result) {
                    if (result){
                        myFunction.getPagingDataNormal(result,1,18,function (r) {
                            return res.json(r);
                        });
                    }else return res.json({
                        "flag":false
                    });
                });
            }
        }
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/allowForPolicy',function (req,res) {
    try {
        access_history_info_.updateStatus({"vid": req.body.vid,"mid": req.body.mid, "status": "aOhvS50kC8Y="}, function (result) {
            if (result) {
                return res.json({
                    "flag": true
                });
            } else return res.json({
                "flag": false
            });
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteAllaccessHistory',function (req,res) {
    try {
        access_history_info_.deleteAllaccessHistory(req.session.userinfo.id, function (result) {
            if (result) {
                return res.json({
                    "flag": true,
                    "data":result['deleteAllaccessHistory']
                });
            } else return res.json({
                "flag": false
            });
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
module.exports = router;