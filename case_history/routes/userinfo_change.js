var express = require('express');
var router = express.Router();
let DES3=require("../fabric/des");
let CNT=require("../constant/constant");
const {User} = require("../db/table/user");
router.post('/', function (req, res) {
    try {
        if (req.session.userinfo.is_login) {
            var user = new User(req.session.userinfo.id,
                DES3.encrypt(req.body.account_email,CNT.KEY),
                DES3.encrypt(req.body.account_name,CNT.KEY),
                DES3.encrypt(req.body.account_pwd,CNT.KEY),
                DES3.encrypt(req.body.account_tel,CNT.KEY),
                DES3.encrypt(req.session.userinfo.user_type,CNT.KEY)
            );
            user.update(function (result) {
                if (result == undefined) {
                    return res.render("error.html")
                } else {
                    return res.redirect('/home/identify');
                }
            });
        } else return res.render("error.html");
    }catch (e) {
        console.log("\n>>>>>>>>>>>>>\n",__filename,"\n",e,"\n>>>>>>>>>>>>>>>>\n")
    }
});

module.exports = router;
