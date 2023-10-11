let express = require('express');
let router = express.Router();
let constant = require("../constant/constant");
const user_ = require("../db/table/user");
const patient_ = require("../db/table/patient_info");
const doctor_ = require("../db/table/doctor_info");
const visitor_ = require("../db/table/visitor_info");
const UUID = require("uuid");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const format = require("string-format");
const path = require("path");
let DES3=require("../fabric/des");
let CNT=require("../constant/constant");
router.get('/', function (req, res) {
    try {
        if (req.session.userinfo.is_login && req.session.userinfo.user_type == constant.USER_TYPE_IN_DATABASE) {
            user_.queryId(req.session.userinfo.id, function (list_user) {
                switch (req.session.userinfo.user_type) {
                    case "patient": {
                        // 登录的是病人
                        patient_.queryId(req.session.userinfo.id, function (ulist) {
                            if (ulist) {
                                return res.render("./identify/identify_patient.html", {
                                    sex: DES3.decrypt(ulist.sex,CNT.KEY),
                                    age: DES3.decrypt(ulist.age,CNT.KEY),
                                    idNum: DES3.decrypt(ulist.idNum,CNT.KEY),
                                    tel: DES3.decrypt(ulist.tel,CNT.KEY),
                                    name: DES3.decrypt(ulist.name,CNT.KEY),
                                    birth: DES3.decrypt(ulist.birth,CNT.KEY),
                                    residence: DES3.decrypt(ulist.residence,CNT.KEY),
                                    company: DES3.decrypt(ulist.company,CNT.KEY),
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: DES3.decrypt(list_user.email,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            } else {
                                return res.render("./identify/identify_patient.html", {
                                    sex: "",
                                    age: "",
                                    idNum: "",
                                    tel: "",
                                    name: "",
                                    birth: "",
                                    residence: "",
                                    company: "",
                                    account_name:DES3.decrypt( list_user.username,CNT.KEY),
                                    account_email:DES3.decrypt( list_user.email,CNT.KEY),
                                    account_pwd:DES3.decrypt( list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            }
                        });
                        break;
                    }
                    case "doctor": {
                        // 登录的是医生
                        doctor_.queryId(req.session.userinfo.id, function (ulist) {
                            if((ulist.rank+ulist.section).length>0)
                            {
                                return res.render("./identify/identify_doctor.html", {
                                    sex: DES3.decrypt(ulist.sex,CNT.KEY),
                                    age: DES3.decrypt(ulist.age,CNT.KEY),
                                    idNum: DES3.decrypt(ulist.idNum,CNT.KEY),
                                    tel: DES3.decrypt(ulist.tel,CNT.KEY),
                                    name: DES3.decrypt(ulist.name,CNT.KEY),
                                    hospital: DES3.decrypt(ulist.hospital,CNT.KEY),
                                    description:DES3.decrypt(ulist.description,CNT.KEY),
                                    rank: DES3.decrypt(ulist.rank,CNT.KEY),
                                    section: DES3.decrypt(ulist.section,CNT.KEY),
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email:DES3.decrypt( list_user.email,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY),
                                    flag:1
                                });
                            } else {
                                return res.render("./identify/identify_doctor.html", {
                                    sex: "",
                                    age: "",
                                    idNum: "",
                                    tel: "",
                                    name: "",
                                    hospital: "",
                                    description: "",
                                    rank: "",
                                    section: "",
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: DES3.decrypt(list_user.email,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY),
                                    flag:0
                                });
                            }
                        });
                        break;
                    }
                    case "accessor": {
                        // 登录的是访问者
                        visitor_.queryId(req.session.userinfo.id, function (ulist) {
                            if (ulist) {
                                return res.render("./identify/identify_visitor.html", {
                                    idNum: DES3.decrypt(ulist.idNum,CNT.KEY),
                                    tel: DES3.decrypt(ulist.tel,CNT.KEY),
                                    name: DES3.decrypt(ulist.name,CNT.KEY),
                                    workplace: DES3.decrypt(ulist.workplace,CNT.KEY),
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: DES3.decrypt(list_user.email,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            } else {
                                return res.render("./identify/identify_visitor.html", {
                                    idNum: "",
                                    tel: "",
                                    name: "",
                                    workplace: "",
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: DES3.decrypt(list_user.email,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            }
                        });
                        break;
                    }
                    case "hospital": {
                        user_.queryId_hospital(req.session.userinfo.id, function (ulist) {
                            if (ulist) {
                                return res.render("./identify/identify_hospital.html", {
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: req.session.userinfo.email,
                                    account_tel: DES3.decrypt(list_user.tel,CNT.KEY),
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            } else return res.render("error.html", {
                                message: "数据库出错！！"
                            });
                        });
                        break;

                    }
                    case "admin": {
                        user_.queryId(req.session.userinfo.id, function (ulist) {
                            if (ulist) {
                                return res.render("./identify/identify_admin.html", {
                                    account_name: DES3.decrypt(list_user.username,CNT.KEY),
                                    account_email: req.session.userinfo.email,
                                    account_pwd: DES3.decrypt(list_user.password,CNT.KEY),
                                    email: DES3.decrypt(list_user.email,CNT.KEY)
                                });
                            } else return res.render("error", {
                                message: "数据库出错！！"
                            });
                        });
                        break;
                    }
                    default : {
                        return res.render("error.html", {
                            message: "到底什么错我也不知道"
                        })
                    }
                }
            });
        }
        else return res.render("error.html", {
            message: "登录错误"
        });
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/createCode_h', function (req, res) {
    /**
     * 医院登录后会创建一个自己的秘钥文件
     * @type {NodeRSA}
     */
    try {
        const key = new NodeRSA(fs.readFileSync(path.join(__dirname, 'files','rsa_public_key_1024.txt'))); //1024 密钥长度
        const result = {};
        for(let i = 0; i < 25; ++i) {
            let temp=[];
            for(let j=0;j<4;++j)
            {
                let ui = {
                    uuid_: UUID.v4(),
                    offer_from: 'hospital'
                };
                temp[j]=key.encrypt(ui,'base64');
            }
            result[i] = temp;
        }
        return res.json(result);
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/createCode_a', function (req, res) {
    try {
        /**
         * admin登录后会创建一个自己的秘钥文件
         * @type {NodeRSA}
         */
        const key = new NodeRSA(fs.readFileSync(path.join(__dirname, 'files','rsa_public_key_1024.txt'))); //1024 密钥长度
        const result = {};
        for(let i = 0; i < 25; ++i) {
            let temp=[];
            for(let j=0;j<4;++j)
            {
                let ui = {
                    uuid_: UUID.v4(),
                    offer_from: 'admin'
                };
                temp[j]=key.encrypt(ui,'base64');
            }
            result[i] = temp;
        }
        return res.json(result);
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
router.post('/init', function (req, res) {
    try {
        /**
         * admin登录后会创建一个自己的秘钥文件
         * @type {NodeRSA}
         */
        const key = new NodeRSA({b: 1024}); //1024 密钥长度
        key.setOptions({encryptionScheme: 'pkcs1'});
        let publicDer = key.exportKey("pkcs8-public-pem");
        let privateDer = key.exportKey('pkcs8-private-pem');
        fs.writeFile(path.join(__dirname, 'files','rsa_public_key_1024.txt'), publicDer, function (err) {
            if (err) console.log("写入出错", err)
        });
        fs.writeFile(path.join(__dirname,'files','rsa_private_key_1024.txt'), privateDer, function (err) {
            if (err) console.log("写入出错", err)
        });
        let str = format("\n公钥\n{}\n私钥\n{}\n", publicDer, privateDer);
        return res.json(str);
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});
module.exports = router;