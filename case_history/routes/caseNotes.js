let express = require('express');
let router = express.Router();
const user_ = require("../db/table/user");
const medical_ = require("../db/table/medical_info");
const doctor_ = require("../db/table/doctor_info");
let pPolicy_ = require("../db/table/pPolicy");
let ahi = require("../db/table/access_history_info");
const electronic_medical_record_ = require("../db/table/electronic_medical_record_info");
let UUID = require("uuid");
const {readFile} = require("fs");
const decodeImage = require('jimp').read;
const qrcodeReader = require("qrcode-reader");
const fs = require("fs");
const path = require("path");
const qr = require("qr-image");
let fabric= require("../fabric/fabric");
let moment = require('moment');
let Patient_info = undefined;
let Medical_info = undefined;
let Doctor_info_ = undefined;
let CONSTANT=require("../constant/constant")
let format=require("string-format");
let myFunction=require("../constant/function")
let DES3=require("../fabric/des");
let CNT=require("../constant/constant");
require('events').EventEmitter.defaultMaxListeners = 0;
router.get('/', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            switch (req.session.userinfo.user_type) {
                case "admin": {
                    if (req.query.userType) {
                        user_.queryUser(DES3.encrypt(req.query.userType,CNT.KEY), function (result) {
                            if (result == undefined) return res.render("error.html", {
                                message: "数据错误！！"
                            });
                            myFunction.getPagingDataNormal(result,req.query.page,18,function (re_data) {
                                return res.json(re_data);
                            });
                        });
                    } else return res.render("./caseNotes/caseNotes_admin.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel,
                    });
                    break;
                }
                case "patient": {
                    if (req.query.page)
                    {
                        electronic_medical_record_.queryIdPatient(req.session.userinfo.id, function (result) {
                            if (result == undefined) return res.render("error.html", {
                                message: "数据错误！！"
                            });
                            myFunction.getPagingDataToFabric(result,req.query.page,18,function (reData) {
                                CONSTANT.RE_DATA_PATIENT=reData;
                                return res.json(CONSTANT.RE_DATA_PATIENT);
                            })
                        });
                    } else return res.render("./caseNotes/caseNotes_patient.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                    break;
                }
                case "doctor": {
                    if (req.query.page)
                    {
                        electronic_medical_record_.queryIdPatientAllChange(req.session.userinfo.id,function (r) {
                            if(r)
                            {
                                CONSTANT.RE_DATA_DOCTOR = myFunction.getTheMedicalDataAndCpabeEncrypt(r,req.query.page,"doctor");

                            }
                            return res.json(CONSTANT.RE_DATA_DOCTOR);
                        });
                    }else return res.render("./caseNotes/caseNotes_doctor.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                    break;
                }
                case "accessor": {
                    if (req.query.page)
                    {
                        electronic_medical_record_.queryIdPatientAllChange(req.session.userinfo.id,function (r) {
                            if(r)
                            {
                                CONSTANT.RE_DATA_ACCESSOR =myFunction.getTheMedicalDataAndCpabeEncrypt(r,req.query.page,"accessor");
                                return res.json(CONSTANT.RE_DATA_ACCESSOR);
                            }
                        });
                    }else  return res.render("./caseNotes/caseNotes_accessor.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                    break;
                }
                case "hospital": {
                    if (req.query.page)
                    {
                        medical_.queryAll(function (r) {
                            myFunction.getPagingDataNormal(r,req.query.page,18,function (re_data) {
                                return res.json(re_data);
                            });
                        });
                    }else  return res.render("./caseNotes/caseNotes_hospital.html", {
                        "username": req.session.userinfo.username,
                        "email": req.session.userinfo.email,
                        "tel": req.session.tel
                    });
                    break;
                }
                default: {
                    return res.render("error.html");
                }
            }
        } else return res.render("error.html");
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }

});
router.post('/get_data', function (req, res) {
    try {
        user_.queryUser(DES3.encrypt(req.body.userType,CNT.KEY), function (result) {
            if (result) {
                myFunction.getPagingDataNormal(result,req.body.page,18,function (re_data) {
                    return res.json(re_data);
                });
            } else return res.render("./caseNotes/caseNotes_admin.html", {
                "username": req.session.userinfo.username,
                "email": req.session.userinfo.email,
                "tel": req.session.tel,
                "dataString": "",
                "total": 1
            });
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }

});
router.post('/searchEmail', function (req, res) {
    try {
        if (req.body&&req.body.email)
        {
            user_.queryemail(DES3.encrypt(req.body.email,CNT.KEY), function (result) {
                if (result) {
                    let re_data = {};
                    re_data["user0"] = {
                        "id": result.id,
                        "email": DES3.decrypt(result.email,CNT.KEY),
                        "username": DES3.decrypt(result.username,CNT.KEY),
                        "password": DES3.decrypt(result.password,CNT.KEY),
                        "tel": DES3.decrypt(result.tel,CNT.KEY)
                    }
                    re_data["total"] = 1;
                    return res.json({
                        "flag":true,
                        "data":re_data});
                } else return res.json({   "flag":false });
            });
        } else return res.json({   "flag":false });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteUser', function (req, res) {
    try {
        if (req.body) {
            user_.delete_user(DES3.encrypt(req.body.user_type,CNT.KEY), function (result) {
                if (result) {
                    return res.json({"status": result["delete"]})
                } else return res.render("error.html", {
                    message: "数据错误！！"
                });
            });
        } else return res.render("error.html", {
            message: "数据错误！！"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/deleteUserOne', function (req, res) {

    try {
        if (req.body) {
            user_.delete_user_one(req.body.idList, function (result) {
                if (result) {
                    return res.json({"status": result["delete_one"]})
                } else return res.render("error.html", {
                    message: "数据错误！！"
                });
            });
        } else return res.render("error.html", {
            message: "数据错误！！"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getPageChoose2', function (req, res) {

    try {
        if (req.body) {
            doctor_.queryemail(DES3.encrypt(req.body.email,CNT.KEY), function (result) {
                if (result.length == 1 && Patient_info != undefined) {
                    Doctor_info_ = result[0].value;
                    let result_ = {
                        "flag": true,
                        "id": Doctor_info_.id,
                        "email": Doctor_info_.email,
                        "name": Doctor_info_.name,
                        "age": Doctor_info_.age,
                        "sex": Doctor_info_.sex,
                        "idNum": Doctor_info_.idNum,
                        "tel": Doctor_info_.tel,
                        "rank": Doctor_info_.rank,
                        "section": Doctor_info_.section,
                        "hospital":Doctor_info_.hospital,
                        "uuid": UUID.v4(),
                        "idP": Patient_info.id,
                        "nameP": Patient_info.name,
                        "sexP": Patient_info.sex,
                        "ageP": Patient_info.age,
                        "birthP": Patient_info.birth,
                        "idNumP": Patient_info.idNum,
                        "telP": Patient_info.tel,
                        "residenceP": Patient_info.residence,
                        "companyP": Patient_info.company
                    }
                    return res.json(result_)
                } else return res.json({"flag": false});
            });
        } else return res.json({"flag": false});
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/create_qrcode_getPageChoose2', function (req, res) {

    try {
        if (req.body) {
            Medical_info = {
                "id": req.body.id,
                "patientId": req.body.patientId,
                "doctorId": req.body.doctorId,
                "mainSuit": req.body.mainSuit,
                "anamnesis": req.body.anamnesis,
                "personalHistory": req.body.personalHistory,
                "familyHistory": req.body.familyHistory,
                "auxiliaryExamination": req.body.auxiliaryExamination,
                "westernDiagnostics": req.body.westernDiagnostics,
                "tcmDiagnosis": req.body.tcmDiagnosis,
                "diagnose": req.body.diagnose,
                "casesOfDetails": req.body.casesOfDetails,
                "section":Doctor_info_.section,
                "healthCheckup":req.body.healthCheckup
            }

            return res.json({"flag": true});
        } else return res.json({"flag": false});
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.get('/create_qrcode_getPageChoose2', function (req, res) {

    try {
        if (Medical_info) {
            try {
                let textString=JSON.stringify(Medical_info.id)+JSON.stringify(Medical_info.patientId)+JSON.stringify(Medical_info.doctorId)
                let img = qr.image(textString, {size: 3, margin: 2});
                res.writeHead(200, {'Content-Type': 'image/png'});
                img.pipe(res);
            } catch (e) {
                res.writeHead(414, {'Content-Type': 'text/html'});
                res.end('<h1>414 Request-URI Too Large</h1>');
            }
        }
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/upload_qrcode', function (req, res) {

    try {
        let data = req.body.qr
        var p = path.resolve(__dirname,"files","1.jpeg")
        const buffer = Buffer.from(data.split(',')[1].replace(/\s/g, "+"), 'base64');
        fs.writeFileSync(p, buffer);
        readFile(p, function (err, fileBuffer) {
            if (err) {
                console.log(err)
                return res.json({
                    flag: false
                });
            }
            decodeImage(fileBuffer, function (err, image) {
                if (err) {
                    console.log(err)
                    return res.json({
                        flag: false
                    });
                }
                let decodeQR = new qrcodeReader();
                decodeQR.callback = function (errorWhenDecodeQR, result) {
                    if (errorWhenDecodeQR) {
                        return res.json({
                            flag: false
                        });
                    }
                    let t=JSON.parse(result.result.split("]")[0].split("[")[1])
                    try {
                        Patient_info = {
                            id: t.id,
                            name: DES3.decrypt(t.name,CNT.KEY),
                            age: DES3.decrypt(t.age,CNT.KEY),
                            sex: DES3.decrypt(t.sex,CNT.KEY),
                            idNum: DES3.decrypt(t.idNum,CNT.KEY),
                            tel: DES3.decrypt(t.tel,CNT.KEY),
                            residence: DES3.decrypt(t.residence,CNT.KEY),
                            company: DES3.decrypt(t.company,CNT.KEY),
                            birth: DES3.decrypt(t.birth,CNT.KEY)
                        }
                    }catch (e) {
                        console.log(e)
                    }
                    return res.json({
                        flag: true,
                        data: Patient_info
                    })
                };
                decodeQR.decode(image.bitmap);
            });
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getPageChoose3', function (req, res) {

    try {
        medical_.queryAll(DES3.encrypt(Doctor_info_.section,CNT.KEY), function (result) {
            if (result) {
                myFunction.getPagingDataNormal(result,req.body.page,18,function (re_data) {
                    return res.json({
                        "flag":true,
                        "data":re_data
                    });
                });

            } else return res.json({"flag": false});
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/searchName', function (req, res) {
    try {
        if (req.body) {
            medical_.queryName(DES3.encrypt(req.body.name,CNT.KEY),async function (r) {
                if(r)
                {
                    await myFunction.getPagingDataNormal(r,1,18,function (re_data) {
                        if (re_data.flag) return res.json(re_data)
                        else return res.json({
                            "flag":false
                        })
                    });
                }else return res.json({
                    "flag":false
                })

            });
        } else return res.render("error.html", {
            message: "数据错误！！"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/submitMedical', function (req, res) {
    try {
        if (req.body) {
            let param = {
                name: "createMedicalHistory",
                id: Medical_info.id,
                mainSuit: new Buffer(Medical_info.mainSuit).toString('base64'),
                anamnesis: new Buffer(Medical_info.anamnesis).toString('base64'),
                personalHistory: new Buffer(Medical_info.personalHistory).toString('base64'),
                familyHistory: new Buffer(Medical_info.familyHistory).toString('base64'),
                healthCheckup: new Buffer(Medical_info.healthCheckup).toString('base64'),
                auxiliaryExamination: new Buffer(Medical_info.auxiliaryExamination).toString('base64'),
                westernDiagnostics: new Buffer(Medical_info.westernDiagnostics).toString('base64'),
                tcmDiagnosis: new Buffer(Medical_info.tcmDiagnosis).toString('base64'),
                diagnose: new Buffer(Medical_info.diagnose).toString('base64'),
                casesOfDetails: new Buffer(Medical_info.casesOfDetails).toString('base64'),
                medicalDetial: new Buffer(req.body.medicalDetial).toString('base64')
            }
            fabric.Invoke(param, function (result) {
                if (result) {
                    let emr = new electronic_medical_record_.Electronic_medical_record(Medical_info.id,Medical_info.patientId,Medical_info.doctorId, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss').toString(),Medical_info.section);
                    emr.insert(function (result) {
                        if(result)
                        {
                            Medical_info = undefined;
                            Patient_info = undefined;
                            return res.json({"flag": true});
                        } else return res.json({"flag": false});
                    });
                } else return res.json({"flag": false});
            });
        }
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/getMedicalData',function (req,res) {
    try {
        electronic_medical_record_.queryIdPatient(req.session.userinfo.id, function (result) {
            if(result)
            {
                myFunction.getPagingDataNormal(result,req.body.page,18,function (r) {
                    CONSTANT.RE_DATA_PATIENT=r;
                    return res.json(r);
                });
            }else return res.json({
                "flag":false
            });

        });
    }catch (e){
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.json({
            "flag": false,
            "data": "请刷新界面"
        });
    }
});
router.post('/searchCreateTime',function (req,res) {

    try {
        if(req.body)
        {
            let param={
                "createTime": req.body.createTime.trim(),
                "pid":req.session.userinfo.id
            }
            try {
                electronic_medical_record_.queryIdcreateTime(param,function (result) {
                    if (result) {
                        myFunction.getPagingDataToFabric(result,req.body.page,18,function (rd) {
                            CONSTANT.RE_DATA_PATIENT=rd;
                            return res.json(rd);
                        });
                    }else return res.json({
                        "flag":false
                    });
                });
            }catch (e) {
                console.log(e)
                return res.json({
                    "flag":false
                })
            }
        }else return res.json({
            "flag":false
        })
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/changeEMR',function (req,res) {
    try
    {
        switch (req.session.userinfo.user_type)
        {
            case "patient":
            {
                if(req.body)
                {
                    let key=req.body.emrTitle[1].slice(3);
                    let mid=req.body.emrTitle[0];
                    myFunction.fabricQueryMedicalHistoryOneNoEncrypt(mid,function (r) {
                        let mres=JSON.parse((JSON.stringify(CONSTANT.RE_DATA_PATIENT[key]) + JSON.stringify(r)).replace(/}{/, ','));
                        return  res.json({
                            "0":mres,
                            "flag":true
                        });
                    });
                } else return  res.json({
                    "flag":false
                });
                break;
            }
            case "doctor":
            {
                if(req.body)
                {
                    let key=req.body.emrTitle[2].slice(3);
                    let mid=req.body.emrTitle[0];
                    myFunction.fabricQueryMedicalHistoryOne(mid,CONSTANT.RE_DATA_DOCTOR[key].patientKey,function (r) {
                        if(JSON.stringify(r)!="{}") {
                            let mres = JSON.parse((JSON.stringify(CONSTANT.RE_DATA_DOCTOR[key]) + JSON.stringify(r)).replace(/}{/, ','));
                            return res.json({
                                "0": mres,
                                "flag": true
                            });
                        }
                        else return  res.json({
                            "flag":false
                        });
                    });
                } else return  res.json({
                    "flag":false
                });
                break;
            }
            case "accessor":
            {
                if(req.body)
                {
                    let key=req.body.emrTitle[2].slice(3);
                    let mid=req.body.emrTitle[0];
                    myFunction.fabricQueryMedicalHistoryOne(mid,CONSTANT.RE_DATA_ACCESSOR[key].patientKey,function (r) {
                        if(JSON.stringify(r)!="{}")
                        {
                            let mres=JSON.parse((JSON.stringify(CONSTANT.RE_DATA_ACCESSOR[key]) + JSON.stringify(r)).replace(/}{/, ','));
                            return  res.json({
                                "0":mres,
                                "flag":true
                            });
                        }
                        else return  res.json({
                                        "flag":false
                                    });
                    });
                }else return  res.json({
                    "flag":false
                });
                break;
            }
            default:{
                return res.json({
                    "flag":false
                })
            }
        }

    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.json({
            "flag":false
        })
    }

});
router.post('/getMedicalDataAll',function (req,res) {
    try {
        electronic_medical_record_.queryIdPatientAllChange(req.session.userinfo.id,function (la0R) {
            if (req.session.userinfo.user_type=="doctor") {
                CONSTANT.RE_DATA_DOCTOR = myFunction.getTheMedicalDataAndCpabeEncrypt(la0R, req.body.page, "doctor");
                return res.json(CONSTANT.RE_DATA_DOCTOR);
            }
            else if (req.session.userinfo.user_type=="accessor") {
                CONSTANT.RE_DATA_ACCESSOR = myFunction.getTheMedicalDataAndCpabeEncrypt(la0R, req.body.page, "accessor");
                return res.json(CONSTANT.RE_DATA_ACCESSOR);
            }
        });
    }catch (e){
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.json({
            "flag": false,
            "data": "请刷新界面"
        });
    }
});
router.post('/searchTel',function (req,res) {
    try {
        if(req.body)
        {
            electronic_medical_record_.queryTelChange({"tel":DES3.encrypt(req.body.tel,CNT.KEY),"vid":req.session.userinfo.id},function (result) {
                if (result) {
                    if (req.session.userinfo.user_type=="doctor")
                    {
                        CONSTANT.RE_DATA_DOCTOR=myFunction.getTheMedicalDataAndCpabeEncrypt(result,req.body.page,"doctor");
                    }
                    return res.json(CONSTANT.RE_DATA_DOCTOR);
                }else return res.json({
                    "flag":false
                })
            });
        }else return res.json({
            "flag":false
        })
    }catch (e){
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.json({
            "flag": false,
            "data": "请刷新界面"
        });
    }
});
router.post('/searchSection',function (req,res) {
    try {
        if(req.body)
        {
            electronic_medical_record_.querySectionChange({"section":DES3.encrypt(req.body.section,CNT.KEY),"vid":req.session.userinfo.id},function (result) {
                if (result) {
                    CONSTANT.RE_DATA_ACCESSOR = myFunction.getTheMedicalDataAndCpabeEncrypt(result,req.body.page,req.session.userinfo.user_type);
                    return res.json(CONSTANT.RE_DATA_ACCESSOR);
                }else return res.json({
                    "flag":false
                })
            });
        }else return res.json({
            "flag":false
        });
    }catch (e){
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.json({
            "flag": false,
            "data": "请刷新界面"
        });
    }
});
module.exports = router;