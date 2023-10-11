const home_pageDao = require("../dao/home_page");
let DES3=require("../../fabric/des");
let CNT=require("../../constant/constant");
function queryHospital(hname,callback) {
    home_pageDao.queryHospital(hname,function (r) {
        if (r) {
            let result_={},d={},m={},c={};
            for(let i in r.data)
            {
                c[DES3.decrypt(r.data[i].section,CNT.KEY)]=1;
                if(r.data[i].doctor=="doctor")
                {
                    d[DES3.decrypt(r.data[i].section,CNT.KEY)]=r.data[i].num;
                }else {
                    m[DES3.decrypt(r.data[i].section,CNT.KEY)]=r.data[i].num;
                }
            }
            let k=[],dd=[],mm=[],j=0;
            for (i in c)
            {
                k.push(i);
               if(d[i]==undefined)
               {
                    dd[j]=0;
                }else {
                    dd[j]=d[i]
                }
                if(m[i]==undefined)
                {
                    mm[j]=0;
                }else {
                    mm[j]=m[i]
                }
                j+=1;
            }
            callback({
                "categories":k,
                "doctor":dd,
                "medical":mm
            });
        } else {
            callback(undefined);
        }
    });
}
function queryPatient(pid,callback) {
    home_pageDao.queryPatient(pid,function (r) {
        if (r) {
            let result_={},a={},e={},c={};
            for(let i in r.data)
            {
                c[r.data[i].time.slice(0,7)]=1;
                if(r.data[i].ahi=="ahi")
                {

                    a[r.data[i].time.slice(0,7)]= (a[r.data[i].time.slice(0,7)]==undefined) ? r.data[i].num : r.data[i].num+a[r.data[i].time.slice(0,7)];
                }else {
                   e[r.data[i].time.slice(0,7)]= (e[r.data[i].time.slice(0,7)]==undefined) ? r.data[i].num : r.data[i].num+e[r.data[i].time.slice(0,7)];
                }
            }
            console.log(a)
            console.log(e)
            let k=[],aa=[],ee=[],j=0;
            for (i in c)
            {
                k.push(i)
            }
            k=k.sort();
            for (i in k)
            {
                if(a[k[i]]==undefined)
                {
                    aa[j]=0;
                }else {
                    aa[j]=a[k[i]]
                }
                if(e[k[i]]==undefined)
                {
                    ee[j]=0;
                }else {
                    ee[j]=e[k[i]]
                }
                j+=1;
            }
            callback({
                "categories":k,
                "emr":ee,
                "ahi":aa
            });
        } else {
            callback(undefined);
        }
    });
}
function queryDoctor(did,callback) {
    home_pageDao.queryDoctor(did,function (r) {
        if (r) {
            let result_={},a={},e={},c={};
            for(let i in r.data)
            {
                c[r.data[i].time.slice(0,10)]=1;
                if(r.data[i].ahi=="ahi")
                {
                    a[r.data[i].time.slice(0,10)]= (a[r.data[i].time.slice(0,10)]==undefined) ? r.data[i].num : r.data[i].num+a[r.data[i].time.slice(0,10)];
                }else {
                    e[r.data[i].time.slice(0,10)]= (e[r.data[i].time.slice(0,10)]==undefined) ? r.data[i].num : r.data[i].num+e[r.data[i].time.slice(0,10)];
                }
            }
            let k=[],aa=[],ee=[],j=0;
            for (i in c)
            {
                k.push(i)
            }
            k=k.sort();
            for (i in k)
            {
                if(a[k[i]]==undefined)
                {
                    aa[j]=0;
                }else {
                    aa[j]=a[k[i]]
                }
                if(e[k[i]]==undefined)
                {
                    ee[j]=0;
                }else {
                    ee[j]=e[k[i]]
                }
                j+=1;
            }
            callback({
                "categories":k,
                "emr":ee,
                "ahi":aa
            });
        } else {
            callback(undefined);
        }
    });
}
function queryAccessor(vid,callback) {
    home_pageDao.queryAccessor(vid,function (r) {
        if (r) {
            let k=[],a=[];
            for (let i in r.data)
            {
                k.push(r.data[i].time.slice(0,7));
                a.push(r.data[i].num);
            }
            callback({
                "categories":k,
                "ahi":a
            });
        } else {
            callback(undefined);
        }
    });
}
module.exports = {
    queryHospital: queryHospital,
    queryPatient:queryPatient,
    queryDoctor:queryDoctor,
    queryAccessor:queryAccessor
}