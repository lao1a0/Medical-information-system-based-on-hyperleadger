var crypto = require('crypto');
// algorithm:{  ecb:'des-ecb',cbc:'des-cbc',des3:'des-ede3'  }
function encrypt(plaintext,KEY){
    if (plaintext) {
        var key = new Buffer(KEY);
        var iv = new Buffer(iv ? iv : 0);
        var cipher = crypto.createCipheriv('des-ede3', key, iv);
        cipher.setAutoPadding(true)  //default true
        var ciph = cipher.update(plaintext, 'utf8', 'base64');
        ciph += cipher.final('base64');
        return ciph;
    }else {
        return undefined
    }
}
function decrypt(encrypt_text,KEY) {
    if(encrypt_text=="undefined") return "";
    if(encrypt_text) {
        var key = new Buffer(KEY);
        var iv = new Buffer(iv ? iv : 0);
        var decipher = crypto.createDecipheriv('des-ede3', key, iv);
        decipher.setAutoPadding(true);
        var txt = decipher.update(encrypt_text, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    }else {
        return undefined
    }
}
// console.log(encrypt("饶欣宇",KEY))
// console.log(decrypt("H67/D14/WJw=",KEY))
module.exports={
    encrypt:encrypt,
    decrypt:decrypt
}