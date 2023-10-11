let express = require('express');
let router = express.Router();
const User = require("../db/table/user");
const NodeRSA = require('node-rsa');
const fs = require("fs");
const {Doctor_info} = require("../db/table/doctor_info");
const {Patient_info} = require("../db/table/patient_info");
const {Visitor_info} = require("../db/table/visitor_info");
const UUID = require("uuid");
let DES3=require("../fabric/des");
let CNT=require("../constant/constant");
const path = require("path");
let pPolicy_ = require("../db/table/pPolicy");
/**
 * 这里实现的是邀请码弹窗的动态展示
 */
router.post("/updateAc", function (req, res) {
    res.send("<div class=\"form-group\">\n" +
        "                        <label>\n" +
        "                            <input name=\"invitation_code\" type=\"text\" placeholder=\"邀请码\">\n" +
        "                        </label>\n" +
        "                    </div>");
});
router.get('/', function (req, res) {
    res.render('index', {title: '基于Hyperledger的医疗信息管理系统'});
});
router.post('/login', function (req, res) {
    try {
        User.queryemail(DES3.encrypt(req.body.email,CNT.KEY), function (ulist) {
            if (ulist) {
                console.log(DES3.decrypt(ulist.password,CNT.KEY))
                console.log(DES3.decrypt(ulist.email,CNT.KEY))
                console.log(DES3.decrypt(ulist.user_type,CNT.KEY))
                console.log(ulist.user_type)
                console.log(ulist.id)
                //设置session
                if(req.body.select!=DES3.decrypt(ulist.user_type,CNT.KEY))
                {
                    return res.render("error",{"message":"用户类型错误！！！"});
                }else if(req.body.password!=DES3.decrypt(ulist.password,CNT.KEY))
                {
                   return res.render("error",{"message":"密码输入错误！！！"});
                }else {
                    req.session.userinfo = {
                        'is_login': true,
                        'user_type':req.body.select ,
                        "username":DES3.decrypt(ulist.username,CNT.KEY) ,
                        "email": DES3.decrypt(ulist.email,CNT.KEY) ,
                        "tel": DES3.decrypt(ulist.tel,CNT.KEY) ,
                        "id":ulist.id
                    };
                    return res.redirect("/home");
                }
            } else {
                return res.render("error",{"message":"邮件输入错误！！！"});
            }
        })
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/register', function (req, res) {
    try {
        let id = {};
        if (req.body.select != "patient") {
            const nodersa = new NodeRSA(fs.readFileSync(path.join(__dirname,"files","rsa_private_key_1024.txt")));
            id = JSON.parse(nodersa.decrypt(req.body.invitation_code, 'utf8'));
            if ((req.body.select == "hospital" || req.body.select == "admin") && id.offer_from == "hospital") {
                return res.render("error.html", {
                    message: "邀请码出错！！！"
                });
            }
        } else {
            id = {uuid_: UUID.v4()};
        }
        let user = new User.User(id.uuid_,
            DES3.encrypt(req.body.email, CNT.KEY),
            DES3.encrypt(req.body.username, CNT.KEY),
            DES3.encrypt(req.body.password, CNT.KEY),
            DES3.encrypt(req.body.tel, CNT.KEY),
            DES3.encrypt(req.body.select, CNT.KEY));
        user.insert(function (result) {
            if (result) {
                switch (req.body.select) {
                    case "doctor": {
                        let doctor = new Doctor_info(id.uuid_, "", "", "", "", "", "", "", "", "");
                        doctor.insert(function (result) {
                            if (result) return res.redirect('/');
                        });
                        break;
                    }
                    case "patient": {
                        let patient = new Patient_info(id.uuid_, "", "", "", "", "", "", "", "");
                        patient.insert(function (result) {
                            pPolicy_.insert(id.uuid_,function (r){
                                return res.redirect('/');
                            });
                        });
                        break;
                    }
                    case "accessor": {
                        let visitor = new Visitor_info(id.uuid_, "", "", "", "");
                        visitor.insert(function (result) {
                            if (result) return res.redirect('/');
                        });
                        break;
                    }
                    default:{
                        return res.redirect('/');
                    }
                }
            } else return res.render("error");
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;