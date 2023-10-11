var express = require('express');
var router = express.Router();
const NodeRSA = require("node-rsa");
const user_ = require("../db/table/user");
let constant = require("../constant/constant");
const UUID = require("uuid");
const fs = require('fs');
var qr = require('qr-image');
let DES3=require("../fabric/des");
const Patient_info = require("../db/dao/patient_info");
const Doctor_info = require("../db/dao/doctor_info");
const Visitor_info = require("../db/dao/visitor_info");
let CNT=require("../constant/constant");
router.get('/', function (req, res) {
    if (req.session.userinfo.is_login) {
        user_.queryId(req.session.userinfo.id, function (list_user) {
            if (req.session.userinfo.user_type == DES3.decrypt(list_user.user_type,CNT.KEY)) {
                constant.USER_TYPE_IN_DATABASE = DES3.decrypt(list_user.user_type,CNT.KEY);
                switch (constant.USER_TYPE_IN_DATABASE) {
                    case "hospital": {
                        return res.render('./home/home_hospital.html',{
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                        });
                        // break;
                    }
                    case "admin": {
                        return res.render('./home/home_admin.html',{
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                        });
                    }
                    case "patient": {
                        return res.render("./home/home_patient.html", {
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                        });
                    }
                    case "doctor": {
                        return res.render("./home/home_doctor.html", {
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                        });

                    }
                    case "accessor": {
                        return res.render("./home/home_visitor.html", {
                            "username": req.session.userinfo.username,
                            "email": req.session.userinfo.email,
                        });
                    }
                    default: {
                        return res.render("error.html");
                    }
                }
            } else return res.render("error.html");
        });

    } else return res.render("error.html");
});
router.get('/create_qrcode', function (req, res, next) {
    try {
        switch(req.session.userinfo.user_type)
        {
            case "patient":
            {
                Patient_info.queryId(req.session.userinfo.id,function (result){
                    var text = JSON.stringify(result.data);
                    try {
                        var img = qr.image(text,{size :3,margin:2});
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        img.pipe(res);
                    } catch (e) {
                        res.writeHead(414, {'Content-Type': 'text/html'});
                        res.end('<h1>414 Request-URI Too Large</h1>');
                    }
                });
                break;
            }
            case "doctor":
            {
                Doctor_info.queryemail(DES3.encrypt(req.session.userinfo.email,CNT.KEY),function (result) {
                    var text = JSON.stringify(result.data);
                    try {
                        var img = qr.image(text,{size :3,margin:2});
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        img.pipe(res);
                    } catch (e) {
                        res.writeHead(414, {'Content-Type': 'text/html'});
                        res.end('<h1>414 Request-URI Too Large</h1>');
                    }
                });
                break;
            }
            case "accessor":
            {
                Visitor_info.queryId(req.session.userinfo.id,function (result) {
                    var text = JSON.stringify(result.data);
                    try {
                        var img = qr.image(text,{size :3,margin:2});
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        img.pipe(res);
                    } catch (e) {
                        res.writeHead(414, {'Content-Type': 'text/html'});
                        res.end('<h1>414 Request-URI Too Large</h1>');
                    }
                });
                break;
            }
        }
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
})
module.exports = router;
