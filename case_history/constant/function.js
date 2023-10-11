let fabric= require("../fabric/fabric");
const path = require("path");
let cpabe=require("../fabric/cpabe");
let DES3=require("../fabric/des");
let format=require("string-format");
const NodeRSA = require('node-rsa');
const doctor_ = require("../db/table/doctor_info");
let pPolicy_ = require("../db/table/pPolicy");
const fs=require("fs");
let CNT=require("../constant/constant");
const nodemailer  = require("nodemailer");
async function getPagingDataToFabric(result,reqPage,pageSize,callback)
{
    let count = result.length;
    //总页数(Math.ceil向上取整)
    let total = Math.ceil(count / pageSize);
    let page_ = (reqPage < 1 || reqPage == undefined || reqPage > total) ? 1 : reqPage;
    let start = (page_ - 1) * pageSize;
    let end = ((page_ >= total) ? count : (start + pageSize));
    const data = result.slice(start, end);
    let re_data = {};
    for (let i = 0; i < data.length; ++i) {
        re_data[data[i].key] = data[i].value;
    }
    re_data["total"] = total;
    re_data["flag"] = true;
    for (let i in re_data)
    {
        fabric.Query({
            "name": "queryMedicalHistoryOne",
            "eid": re_data[i].eid
        },function (r)
        {
            if(r) {
                let result = JSON.parse(r)
                re_data[i]["mainSuit"] = new Buffer(result.mainSuit, 'base64').toString();
                re_data[i]["anamnesis"] = new Buffer(result.anamnesis, 'base64').toString();
                re_data[i]["personalHistory"] = new Buffer(result.personalHistory, 'base64').toString();
                re_data[i]["familyHistory"] = new Buffer(result.familyHistory, 'base64').toString();
                re_data[i]["auxiliaryExamination"] = new Buffer(result.auxiliaryExamination, 'base64').toString();
                re_data[i]["westernDiagnostics"] = new Buffer(result.westernDiagnostics, 'base64').toString();
                re_data[i]["tcmDiagnosis"] = new Buffer(result.tcmDiagnosis, 'base64').toString();
                re_data[i]["casesOfDetails"] = new Buffer(result.casesOfDetails, 'base64').toString();
                re_data[i]["medicalDetial"] = new Buffer(result.medicalDetial, 'base64').toString();
                re_data[i]["diagnose"] = new Buffer(result.diagnose, 'base64').toString();
                re_data[i]["healthCheckup"] = new Buffer(result.healthCheckup, 'base64').toString();
            }
        });
    }
    await callback(re_data);
}
function getPagingDataNormal(result,reqPage,pageSize,callback)
{
    let count = result.length;
    let total = Math.ceil(count / pageSize);
    let page_ = (reqPage < 1 || reqPage == undefined || reqPage > total) ? 1 : reqPage;
    let start = (page_ - 1) * pageSize;
    let end = ((page_ >= total) ? count : (start + pageSize));
    const data = result.slice(start, end);
    let re_data = {};
    for (let j = 0; j < data.length; ++j) {
        re_data[data[j].key] = data[j].value;
    }
    re_data["total"] = total;
    re_data["flag"]=true;
    callback(re_data);
}
function cpABESetup()
{
    let p=path.join(__dirname,"..","fabric","pub_key");
    let m=path.join(__dirname,"..","fabric","master_key");
    cpabe.setup(p,m,function (r) {
        console.log(r)
    });
}
function fabricQueryMedicalHistoryOne(eid,key,callback)
{
    let reData={};
    fabric.Query({
        "name": "queryMedicalHistoryOne",
        "eid": eid
    }, function (r) {
        if(r) {
            let result_ = JSON.parse(r);
            reData["mainSuit"] = DES3.encrypt(new Buffer(result_.mainSuit, 'base64').toString(), key);
            reData["anamnesis"] = DES3.encrypt(new Buffer(result_.anamnesis, 'base64').toString(), key);
            reData["personalHistory"] = DES3.encrypt(new Buffer(result_.personalHistory, 'base64').toString(), key);
            reData["familyHistory"] = DES3.encrypt(new Buffer(result_.familyHistory, 'base64').toString(), key);
            reData["auxiliaryExamination"] = DES3.encrypt(new Buffer(result_.auxiliaryExamination, 'base64').toString(), key);
            reData["westernDiagnostics"] = DES3.encrypt(new Buffer(result_.westernDiagnostics, 'base64').toString(), key);
            reData["tcmDiagnosis"] = DES3.encrypt(new Buffer(result_.tcmDiagnosis, 'base64').toString(), key);
            reData["casesOfDetails"] = DES3.encrypt(new Buffer(result_.casesOfDetails, 'base64').toString(), key);
            reData["medicalDetial"] = DES3.encrypt(new Buffer(result_.medicalDetial, 'base64').toString(), key);
            reData["diagnose"] = DES3.encrypt(new Buffer(result_.diagnose, 'base64').toString(), key);
            reData["healthCheckup"] = DES3.encrypt(new Buffer(result_.healthCheckup, 'base64').toString(), key);
        }
        for(let i in reData)
        {
            if(reData[i]==undefined) reData[i]="";
        }
        callback(reData)
    });
}
function fabricQueryMedicalHistoryOneNoEncrypt(eid,callback)
{
    let reData={};
    fabric.Query({
        "name": "queryMedicalHistoryOne",
        "eid": eid
    },function (r)
    {
        if(r) {
            let result = JSON.parse(r)
            reData["mainSuit"] = new Buffer(result.mainSuit, 'base64').toString();
            reData["anamnesis"] = new Buffer(result.anamnesis, 'base64').toString();
            reData["personalHistory"] = new Buffer(result.personalHistory, 'base64').toString();
            reData["familyHistory"] = new Buffer(result.familyHistory, 'base64').toString();
            reData["auxiliaryExamination"] = new Buffer(result.auxiliaryExamination, 'base64').toString();
            reData["westernDiagnostics"] = new Buffer(result.westernDiagnostics, 'base64').toString();
            reData["tcmDiagnosis"] = new Buffer(result.tcmDiagnosis, 'base64').toString();
            reData["casesOfDetails"] = new Buffer(result.casesOfDetails, 'base64').toString();
            reData["medicalDetial"] = new Buffer(result.medicalDetial, 'base64').toString();
            reData["diagnose"] = new Buffer(result.diagnose, 'base64').toString();
            reData["healthCheckup"] = new Buffer(result.healthCheckup, 'base64').toString();
        }
        callback(reData)
    });
}
function getTheMedicalDataAndCpabeEncrypt(result,reqPage,usertype)
{
    let pageSize = 15;
    let count = result.length;
    let total = Math.ceil(count / pageSize);
    let page_ = (reqPage < 1 || reqPage == undefined || reqPage > total) ? 1 : reqPage;
    let start = (page_ - 1) * pageSize;
    let end = ((page_ >= total) ? count : (start + pageSize));
    const data = result.slice(start, end);
    let re_data = {};
    for (let j = 0; j < data.length; ++j) {
        re_data[data[j].key] = data[j].value;
    }
    if(usertype=="doctor")
    {
        for(let i in re_data) {
            pPolicy_.queryAll(re_data[i].pid,function (rForpid) {
                // let key = re_data[i].idNum + re_data[i].idNum.slice(6, 12);
                // console.log(">>>>>>>>>>>>>>>>>>>>",re_data[0])
                let key = re_data[i].pid.slice(0, 24);
                re_data[i]["patientKey"] = key;
                switch (DES3.decrypt(rForpid.pClassD,CNT.KEY))
                {
                    case "dPolicy1":{
                        let a = toStringHex(re_data[i].rank);
                        let b = toStringHex(re_data[i].section);
                        let c = path.join(__dirname, "..", "fabric", "key", re_data[i].eid);
                        let p = path.join(__dirname, "..", "fabric", "pub_key");
                        cpabe.encrypt(key, format(DES3.decrypt(rForpid.pDetialD,CNT.KEY), a, b), c, p, function (r) {
                            if (r.flag == false) console.log(r)
                        });
                        break;
                    }
                    case "dPolicy2":{
                        let a = toStringHex(re_data[i].rank);
                        let b = toStringHex(re_data[i].section);
                        let d = toStringHex(re_data[i].hospital);
                        let c = path.join(__dirname, "..", "fabric", "key", re_data[i].eid);
                        let p = path.join(__dirname, "..", "fabric", "pub_key");
                        cpabe.encrypt(key, format(DES3.decrypt(rForpid.pDetialD,CNT.KEY), a, b,d), c, p, function (r) {
                            if (r.flag == false) console.log(r)
                        });
                        break;
                    }
                    case "dPolicy3":{
                        let a=[];
                        console.log(JSON.parse(DES3.decrypt(rForpid.pDetialD,CNT.KEY).split(";")[0]))
                        console.log(DES3.decrypt(rForpid.pDetialD,CNT.KEY).split(";"))
                        let policyString=JSON.parse(DES3.decrypt(rForpid.pDetialD,CNT.KEY).split(";")[0])
                        if(policyString.rank=="是")
                            a[0]=toStringHex(re_data[i].rank);
                        else
                            a[0]="";
                        if(policyString.section=="是")
                            a[1]=toStringHex(re_data[i].section);
                        else
                            a[1]="";
                        if(policyString.hp=="是")
                            a[2]=toStringHex(re_data[i].hospital);
                        else
                            a[2]="";
                        if(policyString.sex!=undefined)
                            a[3]=toStringHex(policyString.sex,CNT.KEY);
                        else
                            a[3]="";
                        let c = path.join(__dirname, "..", "fabric", "key", re_data[i].eid);
                        let p = path.join(__dirname, "..", "fabric", "pub_key");
                        console.log("加密密钥："+a[0]+" "+a[1]+" "+a[2]+" "+a[3])
                        cpabe.encrypt(key, format("{0}{1}{2}{3}", a[0], a[1],a[2],a[3]), c, p, function (r) {
                            if (r.flag == false) console.log(r)
                        });
                        break;
                    }
                    default:{
                        break;
                    }
                }
                re_data[i].pname = DES3.encrypt(re_data[i].pname, key);
                re_data[i].age = DES3.encrypt(re_data[i].age, key);
                re_data[i].sex = DES3.encrypt(re_data[i].sex, key);
                re_data[i].idNum = DES3.encrypt(re_data[i].idNum, key);
                re_data[i].birth = DES3.encrypt(re_data[i].birth, key);
                re_data[i].tel = DES3.encrypt(re_data[i].tel, key);
                re_data[i].company = DES3.encrypt(re_data[i].company, key);
                re_data[i].residence = DES3.encrypt(re_data[i].residence, key);
                re_data[i].dname = DES3.encrypt(re_data[i].dname, key);
                re_data[i].dtel = DES3.encrypt(re_data[i].dtel, key);
            })
        }
    }
    else
    {
        for(let i in re_data) {
            pPolicy_.queryAll(re_data[i].pid, function (rForpid) {
                // let key = re_data[i].idNum + re_data[i].idNum.slice(6, 12);
                let key = re_data[i].pid.slice(0, 24);
                re_data[i]["patientKey"] = key;
                re_data[i].pname = DES3.encrypt(re_data[i].pname, key);
                re_data[i].age = DES3.encrypt(re_data[i].age, key);
                re_data[i].sex = DES3.encrypt(re_data[i].sex, key);
                re_data[i].idNum = DES3.encrypt(re_data[i].idNum, key);
                re_data[i].birth = DES3.encrypt(re_data[i].birth, key);
                re_data[i].tel = DES3.encrypt(re_data[i].tel, key);
                re_data[i].company = DES3.encrypt(re_data[i].company, key);
                re_data[i].residence = DES3.encrypt(re_data[i].residence, key);
                re_data[i].dname = DES3.encrypt(re_data[i].dname, key);
                re_data[i].dtel = DES3.encrypt(re_data[i].dtel, key);
            });
        }
    }
    re_data["total"] = total;
    re_data["flag"] = true;
    return re_data;
}
function cpABE(rank,section,eid,key,policyStr)
{
    let a=toStringHex(rank)
    let b=toStringHex(section)
    let c=path.join(__dirname,"..","fabric","key",eid);
    let p=path.join(__dirname,"..","fabric","pub_key");
    let m=path.join(__dirname,"..","fabric","master_key");
    cpabe.encrypt(key,format(policyStr,a,b),c,p,function (r){
        if(r.flag==false) console.log(r)
    })
}
function getTheMedicalDataAndCpabeDecrypt(uid,reqBody,thePolicy,policyString,callback)
{
    switch(thePolicy)
    {
        case "dPolicy1":
        {
           doctor_.queryId(uid,function (r) {
                let a=toStringHex(DES3.decrypt(r.rank,CNT.KEY))
                let b=toStringHex(DES3.decrypt(r.section,CNT.KEY))
                let c=path.join(__dirname,"..","fabric","key",reqBody.eid);
                let p=path.join(__dirname,"..","fabric","pub_key");
                let m=path.join(__dirname,"..","fabric","master_key");
                cpabe.keygen(c,format(policyString,a,b),p,m,async function (r){
                    if(r.flag==true){
                        await cpabe.decrypt(c,c,p,function (r) {
                            console.log(">>>>>>>>>>>>>>>>解密：",r)
                            if(r.flag==true) {
                                let reData={
                                    "pname": DES3.decrypt(reqBody.pname.trim(),r.info),
                                    "psex": DES3.decrypt(reqBody.psex.trim(),r.info),
                                    "page": DES3.decrypt(reqBody.page.trim(),r.info),
                                    "pidNum": DES3.decrypt(reqBody.pidNum.trim(),r.info),
                                    "pbirth":  DES3.decrypt(reqBody.pbirth.trim(),r.info),
                                    "ptel":  DES3.decrypt(reqBody.ptel.trim(),r.info),
                                    "presidence":  DES3.decrypt(reqBody.presidence.trim(),r.info),
                                    "pcompany":  DES3.decrypt(reqBody.pcompany.trim(),r.info),
                                    "createTime": reqBody.createTime,
                                    "section": reqBody.section,
                                    "dname": DES3.decrypt(reqBody.dname,r.info),

                                    "mainSuit":DES3.decrypt(reqBody.mainSuit.trim(),r.info),
                                    "anamnesis":DES3.decrypt(reqBody.anamnesis.trim(),r.info),
                                    "personalHistory":DES3.decrypt(reqBody.personalHistory.trim(),r.info),
                                    "familyHistory":DES3.decrypt(reqBody.familyHistory.trim(),r.info),
                                    "auxiliaryExamination":DES3.decrypt(reqBody.auxiliaryExamination.trim(),r.info),
                                    "westernDiagnostics":DES3.decrypt(reqBody.westernDiagnostics.trim(),r.info),
                                    "tcmDiagnosis":DES3.decrypt(reqBody.tcmDiagnosis.trim(),r.info),
                                    "diagnose":DES3.decrypt(reqBody.diagnose.trim(),r.info),
                                    "casesOfDetails":DES3.decrypt(reqBody.casesOfDetails.trim(),r.info),
                                    "medicalDetial":DES3.decrypt(reqBody.medicalDetial.trim(),r.info),
                                    "healthCheckup":DES3.decrypt(reqBody.healthCheckup.trim(),r.info),
                                    "flag":true
                                };
                                callback({
                                    "flag":true,
                                    "reData":reData
                                })
                            }else {
                                callback({
                                    "flag":false
                                })
                            }
                        })
                    } else {
                        callback({
                            "flag":false
                        })
                    }
                });
            });
           break;
        }
        case "dPolicy2":
        {
            doctor_.queryId(uid,function (r) {
                let a=toStringHex(DES3.decrypt(r.rank,CNT.KEY));
                let b=toStringHex(DES3.decrypt(r.section,CNT.KEY));
                let d=toStringHex(DES3.decrypt(r.hospital,CNT.KEY));
                let c=path.join(__dirname,"..","fabric","key",reqBody.eid);
                let p=path.join(__dirname,"..","fabric","pub_key");
                let m=path.join(__dirname,"..","fabric","master_key");
                cpabe.keygen(c,format(policyString,a,b,d),p,m,async function (r){
                    if(r.flag==true){
                        await cpabe.decrypt(c,c,p,function (r) {
                            if(r.flag==true) {
                                let reData={
                                    "pname": DES3.decrypt(reqBody.pname.trim(),r.info),
                                    "psex": DES3.decrypt(reqBody.psex.trim(),r.info),
                                    "page": DES3.decrypt(reqBody.page.trim(),r.info),
                                    "pidNum": DES3.decrypt(reqBody.pidNum.trim(),r.info),
                                    "pbirth":  DES3.decrypt(reqBody.pbirth.trim(),r.info),
                                    "ptel":  DES3.decrypt(reqBody.ptel.trim(),r.info),
                                    "presidence":  DES3.decrypt(reqBody.presidence.trim(),r.info),
                                    "pcompany":  DES3.decrypt(reqBody.pcompany.trim(),r.info),
                                    "createTime": reqBody.createTime,
                                    "section": reqBody.section,
                                    "dname": DES3.decrypt(reqBody.dname,r.info),

                                    "mainSuit":DES3.decrypt(reqBody.mainSuit.trim(),r.info),
                                    "anamnesis":DES3.decrypt(reqBody.anamnesis.trim(),r.info),
                                    "personalHistory":DES3.decrypt(reqBody.personalHistory.trim(),r.info),
                                    "familyHistory":DES3.decrypt(reqBody.familyHistory.trim(),r.info),
                                    "auxiliaryExamination":DES3.decrypt(reqBody.auxiliaryExamination.trim(),r.info),
                                    "westernDiagnostics":DES3.decrypt(reqBody.westernDiagnostics.trim(),r.info),
                                    "tcmDiagnosis":DES3.decrypt(reqBody.tcmDiagnosis.trim(),r.info),
                                    "diagnose":DES3.decrypt(reqBody.diagnose.trim(),r.info),
                                    "casesOfDetails":DES3.decrypt(reqBody.casesOfDetails.trim(),r.info),
                                    "medicalDetial":DES3.decrypt(reqBody.medicalDetial.trim(),r.info),
                                    "healthCheckup":DES3.decrypt(reqBody.healthCheckup.trim(),r.info),
                                    "flag":true
                                };
                                callback({
                                    "flag":true,
                                    "reData":reData
                                })
                            }else {
                                callback({
                                    "flag":false
                                })
                            }
                        })
                    } else {
                        callback({
                            "flag":false
                        })
                    }
                });
            });
            break;
        }
        case "dPolicy3":
        {
            console.log("???????????????????????????????????????????策略3")
            policyString=JSON.parse(policyString.split(";")[0])
            console.log(policyString)
            doctor_.queryId(uid,function (r) {
                let a=[];
                if(policyString.rank=="是")
                    a[0]=toStringHex(DES3.decrypt(r.rank,CNT.KEY));
                else
                    a[0]="";
                if(policyString.section=="是")
                    a[1]=toStringHex(DES3.decrypt(r.section,CNT.KEY));
                else
                    a[1]="";
                if(policyString.hp=="是")
                    a[2]=toStringHex(DES3.decrypt(r.hospital,CNT.KEY));
                else
                    a[2]="";
                if(policyString.sex!=undefined)
                    a[3]=toStringHex(DES3.decrypt(r.sex,CNT.KEY));
                else
                    a[3]="";
                console.log("解密密钥："+a[0]+" "+a[1]+" "+a[2]+" "+a[3])
                let c=path.join(__dirname,"..","fabric","key",reqBody.eid);
                let p=path.join(__dirname,"..","fabric","pub_key");
                let m=path.join(__dirname,"..","fabric","master_key");
                cpabe.keygen(c,format("{0}{1}{2}{3}",a[0],a[1],a[2],a[3]),p,m,async function (r){
                    if(r.flag==true) {
                        await cpabe.decrypt(c,c,p,function (r) {
                            if(r.flag==true) {
                                let reData={
                                    "pname": DES3.decrypt(reqBody.pname.trim(),r.info),
                                    "psex": DES3.decrypt(reqBody.psex.trim(),r.info),
                                    "page": DES3.decrypt(reqBody.page.trim(),r.info),
                                    "pidNum": DES3.decrypt(reqBody.pidNum.trim(),r.info),
                                    "pbirth":  DES3.decrypt(reqBody.pbirth.trim(),r.info),
                                    "ptel":  DES3.decrypt(reqBody.ptel.trim(),r.info),
                                    "presidence":  DES3.decrypt(reqBody.presidence.trim(),r.info),
                                    "pcompany":  DES3.decrypt(reqBody.pcompany.trim(),r.info),
                                    "createTime": reqBody.createTime,
                                    "section": reqBody.section,
                                    "dname": DES3.decrypt(reqBody.dname,r.info),

                                    "mainSuit":DES3.decrypt(reqBody.mainSuit.trim(),r.info),
                                    "anamnesis":DES3.decrypt(reqBody.anamnesis.trim(),r.info),
                                    "personalHistory":DES3.decrypt(reqBody.personalHistory.trim(),r.info),
                                    "familyHistory":DES3.decrypt(reqBody.familyHistory.trim(),r.info),
                                    "auxiliaryExamination":DES3.decrypt(reqBody.auxiliaryExamination.trim(),r.info),
                                    "westernDiagnostics":DES3.decrypt(reqBody.westernDiagnostics.trim(),r.info),
                                    "tcmDiagnosis":DES3.decrypt(reqBody.tcmDiagnosis.trim(),r.info),
                                    "diagnose":DES3.decrypt(reqBody.diagnose.trim(),r.info),
                                    "casesOfDetails":DES3.decrypt(reqBody.casesOfDetails.trim(),r.info),
                                    "medicalDetial":DES3.decrypt(reqBody.medicalDetial.trim(),r.info),
                                    "healthCheckup":DES3.decrypt(reqBody.healthCheckup.trim(),r.info),
                                    "flag":true
                                };
                                callback({
                                    "flag":true,
                                    "reData":reData
                                })
                            }else {
                                callback({
                                    "flag":false
                                })
                            }
                        })
                    } else {
                        callback({
                            "flag":false
                        })
                    }
                });
            });
            break;
        }
        default:
        {
           callback({
               "flag":false
           });
        }
    }
}
function rsaInit()
{
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
}
function rsaEncrypt(data)
{
    if(data)
    {
        const key = new NodeRSA(fs.readFileSync(path.join(__dirname,"files",'rsa_public_key_1024.txt'))); //1024 密钥长度
        return key.encrypt(data,'base64');
    }
    else
    {
        return "";
    }

}
function rsaDecrypt(data)
{
    if(data)
    {
        const nodersa = new NodeRSA(fs.readFileSync(path.join(__dirname,"files",'rsa_private_key_1024.txt')));
        return nodersa.decrypt(data, 'utf8')
    }else {
        return "";
    }

}
function toStringHex(data)
{
    if(data==undefined)
    {
        return "";
    }
    else return new Buffer(data).toString("hex");
}
// 参数：发件人，收件人，主题，正文（支持html格式）
function sendMail(from, aliasName, tos, subject, msg)
{
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true, // use SSL
        secure: true,
        port: 465,
        auth: {
            user: from,
            pass: CNT.EmailSMTP,
        }
    });

    smtpTransport.sendMail({
        from    : aliasName + ' ' + '<' + from + '>',
        to      : tos,
        subject : subject,//邮件主题
        html    : msg
    }, function(err, res) {
        if (err)
        {
            console.log('error: ', err);
        }
    });
}
module.exports={
    getPagingDataToFabric:getPagingDataToFabric,
    getPagingDataNormal:getPagingDataNormal,
    getTheMedicalDataAndCpabeEncrypt:getTheMedicalDataAndCpabeEncrypt,
    getTheMedicalDataAndCpabeDecrypt:getTheMedicalDataAndCpabeDecrypt,
    fabricQueryMedicalHistoryOne:fabricQueryMedicalHistoryOne,
    fabricQueryMedicalHistoryOneNoEncrypt:fabricQueryMedicalHistoryOneNoEncrypt,
    sendMail:sendMail
}