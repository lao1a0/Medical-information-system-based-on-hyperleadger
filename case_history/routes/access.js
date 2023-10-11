var express = require('express');
const User = require("../db/table/user");
let doctor_ = require("../db/table/doctor_info");
let visitor_ = require("../db/table/visitor_info");
let pPolicy_ = require("../db/table/pPolicy");
let patient_ = require("../db/table/patient_info");
let electronic_medical_record_= require("../db/table/electronic_medical_record_info");
let ahi_ = require("../db/table/access_history_info");
let homePage_ = require("../db/table/home_page");
let cpabe=require("../fabric/cpabe");
let CONSTANT=require("../constant/constant");
const fs = require('fs');
const download = require('download');
const xlsx = require('xlsx');
let DES3=require("../fabric/des");
var router = express.Router();
let CNT=require("../constant/constant");
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart()
const multer = require('multer')
let fabric= require("../fabric/fabric");
let UUID = require("uuid");
const upload = multer({ dest: './public/uploads' });
router.get('/', function (req, res) {
    try {
        switch (req.session.userinfo.user_type) {
            case "patient": {
                    pPolicy_.queryAll(req.session.userinfo.id,function (r) {
                        if(r)
                        {
                            let redata={
                                "username": req.session.userinfo.username,
                                "email": req.session.userinfo.email,
                                "tel": req.session.tel,
                                "policyD":DES3.decrypt(r.pClassD,CNT.KEY),
                                "policyV":DES3.decrypt(r.pClassV,CNT.KEY),
                                "text":"暂未设置"
                            };
                            if(DES3.decrypt(r.pClassD,CNT.KEY)=="dPolicy3")
                            {
                                redata["text"]=DES3.decrypt(r.pDetialD,CNT.KEY).split(";")[1];
                            }
                            return res.render("./access/access_patient.html", redata);
                        }else
                        {
                            return res.render("./access/access_patient.html", {
                                "username": req.session.userinfo.username,
                                "email": req.session.userinfo.email,
                                "tel": req.session.tel
                            });
                        }

                    });
                break
            }
            case "admin": {
                return res.render("./access/access_admin.html", {
                    "username": req.session.userinfo.username,
                    "email": req.session.userinfo.email,
                    "tel": req.session.tel
                });
            }
            default: {
                return res.render("error.html");
            }
        }
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
        return res.render("error.html");
    }
});
router.post('/getData', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            User.queryId(req.body.user_id, function (user_base) {
                switch (req.body.user_type) {
                    case "hospital": {
                        if (user_base) {
                            return res.json({
                                "flag": true,
                                "username": DES3.decrypt(user_base.username,CNT.KEY),
                                "email": DES3.decrypt(user_base.email,CNT.KEY),
                                "tel": DES3.decrypt(user_base.tel,CNT.KEY),
                                // "password": DES3.decrypt(user_base.password,CNT.KEY)
                            });
                        } else return res.json({
                            "flag": false
                        });
                    }
                    case "doctor": {
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
                                    "password": DES3.decrypt(user_base.password,CNT.KEY)
                                });
                            } else return res.json({
                                "flag": false
                            });
                        });
                        break;
                    }
                    case "patient": {
                        patient_.queryId(req.body.user_id, function (ulist) {
                            if (ulist) {
                                return res.json({
                                    "flag": true,
                                    "username": DES3.decrypt(ulist.name,CNT.KEY),
                                    "age": DES3.decrypt(ulist.age,CNT.KEY),
                                    "sex": DES3.decrypt(ulist.sex,CNT.KEY),
                                    "tel": DES3.decrypt(ulist.tel,CNT.KEY),
                                    "residence": DES3.decrypt(ulist.residence,CNT.KEY),
                                    "company": DES3.decrypt(ulist.company,CNT.KEY),
                                });
                            } else return res.json({
                                "flag": false
                            });
                        });
                        break;
                    }
                    case "accessor": {
                        visitor_.queryId(req.body.user_id, function (ulist) {
                            if (ulist) {
                                return res.json({
                                    "flag": true,
                                    "username": DES3.decrypt(ulist.name,CNT.KEY),
                                    "idNum": DES3.decrypt(ulist.idNum,CNT.KEY),
                                    "tel": DES3.decrypt(ulist.tel,CNT.KEY),
                                    "workplace": DES3.decrypt(ulist.workplace,CNT.KEY),
                                });
                            } else return res.json({
                                "flag": false
                            });
                        });
                        break;
                    }
                    case "admin": {
                        return res.render("./access/access_admin.html", {
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                            "tel": req.session.tel
                        });
                    }
                    default: {
                        return res.render("error.html");
                    }
                }
            });
        } else return res.render("error.html");
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/changeData',function (req,res){
    try {
        if (req.session.userinfo.is_login) {
            switch (req.body.user_type){
                case "hospital":{
                    let param = {
                        "id":req.body.user_id,
                        "username":DES3.encrypt(req.body.user_data.change_name,CNT.KEY),
                        "email":DES3.encrypt(req.body.user_data.change_email,CNT.KEY),
                        "tel":DES3.encrypt(req.body.user_data.change_tel,CNT.KEY)
                    }
                    User.updateNoPwd(param,function (result){
                        if(result)
                        {
                            return res.json({"flag":"更新成功"});
                        }else return res.json({"flag":"更新失败"});
                    });
                    break;
                }
                case "doctor":{
                    let param={
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
                    User.updatePwd({"id":req.body.user_id,"password":DES3.encrypt(req.body.user_data.change_pwd,CNT.KEY)},function (result){
                        if(result){
                            doctor_.updateExpD(param,function (result){
                                if(result)
                                {
                                    return res.json({"flag":"更新成功"});
                                }else return res.json({"flag":"更新失败"});
                            });
                        }else return res.json({"flag":"更新失败"});
                    });
                    break;
                }
                case "patient":{
                    let param={
                        "id":req.body.user_id,
                        "name": DES3.encrypt(req.body.user_data.change_name,CNT.KEY),
                        "age":DES3.encrypt(req.body.user_data.change_age,CNT.KEY),
                        "sex":DES3.encrypt(req.body.user_data.change_sex,CNT.KEY),
                        "tel":DES3.encrypt(req.body.user_data.change_tel,CNT.KEY),
                        "residence":DES3.encrypt(req.body.user_data.change_r,CNT.KEY),
                        "company":DES3.encrypt(req.body.user_data.change_c,CNT.KEY)
                    }
                    patient_.updateNoBNoI(param,function (result){
                        if(result)
                        {
                            return res.json({"flag":"更新成功"});
                        }else return res.json({"flag":"更新失败"});
                    });
                    break;
                }
                case "accessor":{
                    let v=new visitor_.Visitor_info(req.body.user_id,
                        DES3.encrypt(req.body.user_data.change_name,CNT.KEY),
                        DES3.encrypt(req.body.user_data.change_ic,CNT.KEY),
                        DES3.encrypt(req.body.user_data.change_tel,CNT.KEY),
                        DES3.encrypt(req.body.user_data.change_w,CNT.KEY))
                    v.update(function (result){
                        if(result)
                        {
                            return res.json({"flag":"更新成功"});
                        }else return res.json({"flag":"更新失败"});
                    });
                    break;
                }
            }

        } else return res.render("error.html");
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/setThePolicy',function (req,res){
    try {
        ahi_.deleteAllaccessHistory(req.session.userinfo.id,function (r) {
            if(req.body) {
                switch (req.body.data)
                {
                    case "dPolicy1":{
                        let param={
                            "pid":req.session.userinfo.id,
                            "pClassD":DES3.encrypt("dPolicy1",CNT.KEY),
                            "pDetialD":DES3.encrypt("'{0}{1}'",CNT.KEY),
                        }
                        pPolicy_.updateD(param,function (r) {
                            return res.json({
                                "flag":true
                            });
                        })
                        break;
                    }
                    case "dPolicy2":{
                        let param={
                            "pid":req.session.userinfo.id,
                            "pClassD":DES3.encrypt("dPolicy2",CNT.KEY),
                            "pDetialD":DES3.encrypt("'{0}{1}{2}'",CNT.KEY),
                        }
                        pPolicy_.updateD(param,function (r) {
                            return res.json({
                                "flag":true
                            });
                        });
                        break;
                    }
                    case "dPolicy3":{
                        let param={
                            "pid":req.session.userinfo.id,
                            "pClassD":DES3.encrypt("dPolicy3",CNT.KEY),
                            "pDetialD":DES3.encrypt(JSON.stringify(req.body.d)+";"+req.body.t,CNT.KEY),
                        }
                        pPolicy_.updateD(param,function (r) {
                            return res.json({
                                "flag":true
                            });
                        });
                        break;
                    }
                    case "vPolicy1":{
                        let param={
                            "pid":req.session.userinfo.id,
                            "pClassV":DES3.encrypt("vPolicy1",CNT.KEY),
                            "pDetialV":DES3.encrypt("''",CNT.KEY),
                        }
                        pPolicy_.updateV(param,function (r) {
                            return res.json({
                                "flag":true
                            });
                        })
                        break;
                    }
                    case "vPolicy2":{
                        let param={
                            "pid":req.session.userinfo.id,
                            "pClassV":DES3.encrypt("vPolicy2",CNT.KEY),
                            "pDetialV":DES3.encrypt("''",CNT.KEY),
                        }
                        pPolicy_.updateV(param,function (r) {
                            return res.json({
                                "flag":true
                            });
                        })
                        break;
                    }
                    default:{
                        return res.json({
                            "flag":false,
                            "data":"暂未开发"
                        });
                    }
                }
            }
            else{
                return res.json({
                    "flag":false
                });
            }
        });

    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/initalHomePageH', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            homePage_.queryHospital(DES3.encrypt(req.session.userinfo.username,CNT.KEY), function (result) {
                if(result)
                {
                    return res.json(result)
                }else return res.json({ "categories":[],
                    "doctor":[],
                    "medical":[]})
            });
        } else return res.render("error", {
            message: "未登录"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/initalHomePageP', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            homePage_.queryPatient(req.session.userinfo.id, function (result) {
                if(result)
                {
                    return res.json(result)
                }else return res.json({ "categories":[],
                    "emr":[],
                    "ahi":[]})
            });
        } else return res.render("error", {
            message: "未登录"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/initalHomePageD', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            homePage_.queryDoctor(req.session.userinfo.id, function (result) {
                if(result)
                {
                    return res.json(result)
                }else return res.json({ "categories":[],
                    "emr":[],
                    "ahi":[]})
            });
        } else return res.render("error", {
            message: "未登录"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/initalHomePageV', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            homePage_.queryAccessor(req.session.userinfo.id, function (result) {
                if(result)
                {
                    return res.json(result)
                }else return res.json({ "categories":[],
                    "emr":[],
                    "ahi":[]})
            });
        } else return res.render("error", {
            message: "未登录"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post("/uploadTemplate",multipartMiddleware,function (req,res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.json({
                "flag":false,
                "text": '请选择文件上传'
            });
        }
        const { path: filePath, originalFilename } = req.files.myFileName
        if (!originalFilename.endsWith('xls') && !originalFilename.endsWith('xlsx')) {
            return res.json({
                "flag":false,
                "text": '请上传xls或xlsx格式的文件'
            });
        }
        let workbook = xlsx.readFile(filePath);
        let sheetNames = workbook.SheetNames;
        let sheet1 = workbook.Sheets[sheetNames[0]];
        let range = xlsx.utils.decode_range(sheet1['!ref']);
        let data={};
        for (let C = range.s.c; C <= range.e.c; ++C)
        {
            let row_value = [];
            for (let R = range.s.r; R <= range.e.r; ++R)
            {
                if(R==0) continue;
                let cell_address = {c: C, r: R}; //获取单元格地址
                let cell = xlsx.utils.encode_cell(cell_address); //根据单元格地址获取单元格
                if (sheet1[cell]) {
                    if(typeof (sheet1[cell])!='string') sheet1[cell].v=sheet1[cell].v.toString()
                    row_value.push(sheet1[cell].v)
                }
            }
            let titleName=xlsx.utils.encode_cell({c: C, r: 0});
            data[sheet1[titleName].v] = row_value;
        }
        for (let i = range.s.c; i <= range.e.c; ++i) {
            let mid=UUID.v4();
            if(mid&&data)
            {
                let param = {
                    name: "createMedicalHistory",
                    id: mid,
                    mainSuit: new Buffer(data["主诉"][i]).toString('base64'),
                    anamnesis: new Buffer(data["既往病史"][i]).toString('base64'),
                    personalHistory: new Buffer(data["个人史"][i]).toString('base64'),
                    familyHistory: new Buffer(data["家族史"][i]).toString('base64'),
                    healthCheckup: new Buffer(data["体格检查"][i]).toString('base64'),
                    auxiliaryExamination: new Buffer(data["辅助检查"][i]).toString('base64'),
                    westernDiagnostics: new Buffer(data["西医诊断"][i]).toString('base64'),
                    tcmDiagnosis: new Buffer(data["中医诊断"][i]).toString('base64'),
                    diagnose: new Buffer(data["处置"][i]).toString('base64'),
                    casesOfDetails: new Buffer(data["病历详情"][i]).toString('base64'),
                    medicalDetial: new Buffer(data["用药详情"][i]).toString('base64')
                }
                fabric.Invoke(param, function (result) {
                    laolao(UUID.v4(),mid,req.session.userinfo.id,data,i);
                });
            }
        }
        return res.json({
            "flag":true,
            "text":"读取成功"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
function laolao(did,mid,pid,data,i) {
    let emr = new electronic_medical_record_.Electronic_medical_record(mid, pid,did,data["就诊时间"][i], DES3.encrypt(data["就诊科室"][i],CNT.KEY));
    emr.insert(function (result) {});
    let doctor = new doctor_.Doctor_info(did,DES3.encrypt(data['主治医师'][i],CNT.KEY), "", "", "",DES3.encrypt(data['医生电话'][i],CNT.KEY), DES3.encrypt(data['医院'][i],CNT.KEY), "", DES3.encrypt(data["职称"][i],CNT.KEY), DES3.encrypt(data["就诊科室"][i],CNT.KEY));
    doctor.insert(function (result) {});
}
module.exports = router;