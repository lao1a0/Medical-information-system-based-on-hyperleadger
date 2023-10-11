const patient_ = require("../db/table/patient_info");
const doctor_ = require("../db/table/doctor_info");
const visitor_ = require("../db/table/visitor_info");
const user_ = require("../db/table/user");
var express = require('express');
var router = express.Router();
let constant = require("../constant/constant");
let DES3=require("../fabric/des");
let CNT=require("../constant/constant");
let myFunction=require("../constant/function");
router.post('/', function (req, res) {
    try {
        if (req.session.userinfo.is_login && req.session.userinfo.user_type == constant.USER_TYPE_IN_DATABASE) {
            switch (req.session.userinfo.user_type) {
                case "patient": {
                    // 病人填写自己的个人信息
                    var patient = new patient_.Patient_info(req.session.userinfo.id,
                        DES3.encrypt(req.body.name,CNT.KEY),
                        DES3.encrypt( req.body.age,CNT.KEY),
                        DES3.encrypt(req.body.sex,CNT.KEY),
                        DES3.encrypt(req.body.idNum,CNT.KEY),
                        DES3.encrypt(req.body.tel,CNT.KEY),
                        DES3.encrypt(req.body.residence,CNT.KEY),
                        DES3.encrypt(req.body.company,CNT.KEY),
                        DES3.encrypt(req.body.birth,CNT.KEY));
                    // 这之后是修改需要update
                    var param = {
                        id: req.session.userinfo.id,
                        name: DES3.encrypt(req.body.name,CNT.KEY),
                        age: DES3.encrypt(req.body.age,CNT.KEY),
                        sex: DES3.encrypt(req.body.sex,CNT.KEY),
                        idNum: DES3.encrypt(req.body.idNum,CNT.KEY),
                        tel: DES3.encrypt(req.body.tel,CNT.KEY),
                        residence: DES3.encrypt(req.body.residence,CNT.KEY),
                        company: DES3.encrypt(req.body.company,CNT.KEY),
                        birth: DES3.encrypt(req.body.birth,CNT.KEY)
                    }
                    patient_.update(param, function () {
                        return res.redirect('/home/identify');
                    });
                    break;
                }
                case "doctor": {
                    // 医生填写自己的个人信息
                    var doctor = new doctor_.Doctor_info(req.session.userinfo.id,
                        DES3.encrypt(req.body.name, CNT.KEY),
                        DES3.encrypt(req.body.age, CNT.KEY),
                        DES3.encrypt(req.body.sex, CNT.KEY),
                        DES3.encrypt(req.body.idNum, CNT.KEY),
                        DES3.encrypt(req.body.tel, CNT.KEY),
                        DES3.encrypt(req.body.hospital, CNT.KEY),
                        DES3.encrypt(req.body.description, CNT.KEY),
                        DES3.encrypt(req.body.rank, CNT.KEY),
                        DES3.encrypt(req.body.section, CNT.KEY));
                    // 这之后是修改需要update
                    doctor.update(function (result) {
                        if (result) {
                            return res.redirect('/home/identify');
                        }
                        return res.render("error");
                    });
                    break;
                }
                case "accessor": {
                    //访问者填写自己的个人信息
                    let visitor = new visitor_.Visitor_info(req.session.userinfo.id,
                        DES3.encrypt(req.body.name,CNT.KEY),
                        DES3.encrypt(req.body.idNum,CNT.KEY),
                        DES3.encrypt(req.body.tel,CNT.KEY),
                        DES3.encrypt(req.body.workplace,CNT.KEY)
                    );
                    // 这之后是修改需要update
                    visitor.update(function (result) {
                        if (result) {
                            return res.redirect('/home/identify');
                        }
                        return res.render("error");
                    });
                    break;
                }
                default: {
                    res.render("error.html",{
                        message:"用户类型错误！！"
                    });
                }
            }

        }
        else return res.render("error.html",{
            message:"未登录或用户类型错误"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/reset_the_password', function (req, res) {
    try {
        if(req.body.rtp.trim())
        {
            user_.queryemail(DES3.encrypt(req.body.rtp.trim(),CNT.KEY),function (r){
                if(r)
                {
                    var pasArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-', '$', '%', '&', '@', '+', '!'];
                    var password = '';
                    let pasArrLen=8;
                    for (var i =0;i<pasArrLen;++i) {
                        var x = Math.floor(Math.random() * pasArr.length);
                        password += pasArr[x];
                    }
                    // console.log(password)
                    let param={
                        "from":CNT.SystemEmail,
                        "aliasName":"基于hyperledger的医疗信息系统",
                        "tos":req.body.rtp.trim(),
                        "subject":"密码重置",
                        "msg":"您的重置密码为："+password
                    }
                    // console.log(param)
                    let u = new user_.User(r.id, r.email, r.username,DES3.encrypt(password,CNT.KEY),r.tel,r.user_type)
                    u.update(function (ur) {
                        console.log(ur)
                        if(ur)
                        {
                            myFunction.sendMail(param.from, param.aliasName, param.tos, param.subject, param.msg)
                            return res.json({
                                "flag":"邮件发送成功，请查收"
                            })
                        }else {
                            return res.json({
                                "flag":"密码重置失败"
                            })
                        }
                    })
                }else {
                    return res.json({
                        "flag":"密码重置失败"
                    })
                }
            })
        }else {
            return res.json({
                "flag":"请输入邮箱"
            })
        }

    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});

module.exports = router;