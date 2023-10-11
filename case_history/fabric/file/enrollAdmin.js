let cpabe=require("/home/rap/case_history/fabric/cpabe.js")
let  format=require("string-format")
/**
 * 用户类型：医生，
 * 科室：血管科
 */
cpabe.setup(path.join(__dirname,"fabric","pub_key"),path.join(__dirname,"fabric","master_key"),function (r) {
    console.log(r)
});
let a=new Buffer("主任医师").toString("hex")
let b=new Buffer("鼻科").toString("hex")
let c=new Buffer("心血管科").toString("hex")
cpabe.encrypt("饶欣宇",format("'{0}{1}'",a,b),b,function (r){
    console.log(r)
})
let pvtK="doctor" //私钥名字


// /*
//  * Copyright IBM Corp. All Rights Reserved.
//  *
//  * SPDX-License-Identifier: Apache-2.0
//  */
//
// 'use strict';
//
// const FabricCAServices = require('fabric-ca-client');
// const { Wallets } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');
//
// async function EnrollAdmin(callback) {
//     try {
//         // load the network configuration
//         const ccpPath = path.resolve("/home/lao/GOPATH/src/github.com/hyperledger/fabric/scripts/fabric-samples", 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
//
//         // Create a new CA client for interacting with the CA.
//         const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
//         const caTLSCACerts = caInfo.tlsCACerts.pem;
//         const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
//
//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//
//         // Check to see if we've already enrolled the admin user.
//         const identity = await wallet.get('admin');
//         if (identity) {
//             callback('An identity for the admin user "admin" already exists in the wallet');
//             return;
//         }
//
//         // Enroll the admin user, and import the new identity into the wallet.
//         const enrollment = await ca.enroll({
//             enrollmentID: 'admin',
//             enrollmentSecret: 'adminpw' });
//         const x509Identity = {
//             credentials: {
//                 certificate: enrollment.certificate,
//                 privateKey: enrollment.key.toBytes(),
//             },
//             mspId: 'Org1MSP',
//             type: 'X.509',
//         };
//         await wallet.put('admin', x509Identity);
//         // callback('Successfully enrolled admin user "admin" and imported it into the wallet');
//         callback('Successfully enrolled admin user "admin" and imported it into the wallet')
//
//     } catch (error) {
//         callback(`Failed to enroll admin user "admin": ${error}`)
//         process.exit(1);
//     }
// }
//
// module.exports={
//     EnrollAdmin:EnrollAdmin
// };
