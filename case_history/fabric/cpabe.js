/***
 * 生成的加密文件，可以给一群符合条件的人看
 * keygen用来根据一个人的属性生成私钥（用于解密）
 * encryp用来根据设定的属性值加密文件
 * @type {path.PlatformPath | path}
 */
let path=require("path");
var shell = require('shelljs');
let fs=require("fs");
/***
 * 产生全局的公钥和私钥
 */
function setup(p,m,callback){
    try {
        shell.exec("cpabe-setup -p "+p+" -m "+m,function (r) {
            if (r!=0)
            {
                callback({
                    "flag": false,
                    "info": "setup:"+r
                });
            }else {
                callback({
                    "flag": true,
                    "info": "setup:" + r
                });
            }
        });
    }catch (e) {
        callback({
            "flag":false,
            "info":"setup"+e
        });
    }
}
/**
 * 使用master_key 和 pub_key 以及cpabe-keygen命令，为具有属性值的用户产生私钥
 * @param a 生成的私钥的名字 name = "cs05"
 * @param b 限制属性xxx 'xx>xx'
 */
async function keygen(a,b,p,m,callback){
    try {
        var s = "cpabe-keygen -o "+a+"_prikey "+p+" "+m+" "+b;
        shell.exec(s,function (r) {
            if (r!=0)
            {
                callback({
                    "flag":false,
                    "info":"keygen:"+s
                });
            }else {
                callback({
                    "flag": true,
                    "info": "keygen:" + s
                });
            }
        });
    }catch (e) {
        callback({
            "flag":false,
            "info":"keygen"+e
        });
    }
}
/**
 * 加密
 * @param a 明文
 * @param b 解密需要满足的条件
 * @param c 加密后的文件名
 */
function encrypt(a,b,c,p,callback){
    try {
        fs.writeFileSync(c,a);
        var s = "cpabe-enc "+p+" "+c+" "+b;
        shell.exec(s,function (r) {
            if (r!=0)
            {
                console.log(r)
                callback({
                    "flag":false,
                    "info":"encrypt:"+s
                });
            }else{
                callback({
                    "flag":true,
                    "info":"encrypt:"+s
                });
            }
        });

    }catch (e) {
        callback({
            "flag":false,
            "info":"encrypt"+e
        });
    }
}

/**
 * 解密
 * @param a 私钥
 * @param c 解密的文件名
 */
async function decrypt(a,c,p,callback) {
    try {
        var s = "cpabe-dec "+p+" "+a+"_prikey "+c+".cpabe";
        shell.exec(s,function (r) {
            if(r!=0)
            {
                callback({
                    "flag":false,
                    "info":"decrypt:"+s
                });
            }else{
                var d = fs.readFileSync(c, 'utf8');
                console.log(d);
                // fs.readFile(c,'utf8',function (e,d) {
                //     if(e)
                //     {
                //         callback({
                //             "flag":false,
                //             "info":"decrypt:"+e
                //         });
                //     }else {
                        callback({
                            "flag":true,
                            "info":d,
                            "s":s
                        });
                    // }
                // });
            }
        });

    }catch (e) {
        callback({
            "flag":false,
            "info":"decrypt"+e
        });
    }
}
module.exports={
    encrypt:encrypt,
    decrypt:decrypt,
    keygen:keygen,
    setup:setup
}