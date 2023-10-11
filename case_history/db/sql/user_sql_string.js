let user = {
    queryUser:'SELECT u.`id`,u.`email`,u.`password`,u.`username`,p.`tel` ptel,v.`tel` vtel,u.`tel` utel,u.`user_type` FROM `user` u\n' +
        ' LEFT JOIN patient_info p ON u.`id`=p.`id` \n' +
        ' LEFT JOIN visitor_info v ON v.`id`=u.`id`\n' +
        'WHERE u.`user_type`=?',
    queryemail: 'SELECT * FROM user WHERE email=?',
    queryid: 'SELECT * FROM user WHERE id=?',
    update: 'UPDATE user SET username=?, password=?, tel=?, email=? ,user_type=? WHERE id=?',
    updateNoPwd: 'UPDATE user SET username=?, tel=?, email=? WHERE id=?',
    insert: 'INSERT INTO user(id,username, password, tel, email ,user_type) VALUES(?,?,?,?,?,?)',
    queryall: 'SELECT * FROM user',
    delete_user: 'DELETE U,d,p,v,pp FROM `user` AS U  \n' +
        '    LEFT JOIN doctor_info d ON U.id=d.id\n' +
        '    LEFT JOIN patient_info  p ON U.id=p.id\n' +
        '    LEFT JOIN visitor_info v  ON U.id=v.id\n' +
        '    LEFT JOIN patient_policy pp ON U.id=pp.pid\n' +
        '    WHERE U.user_type=?',
    queryid_hospital:'SELECT * FROM user WHERE id=? and user_type="XrJMuZJnOUucnbVAM3PZ/A=="',
    delete_user_one:'DELETE U,doctor_info,patient_info,visitor_info FROM `user` AS U  LEFT OUTER JOIN doctor_info ON U.id=doctor_info.id \n' +
        '\t\t\t\t\t\t\t\t\t\t\t  LEFT JOIN patient_info ON U.id=patient_info.id \n' +
        '\t\t\t\t\t\t\t\t\t\t\t  LEFT JOIN visitor_info ON U.id=visitor_info.id\n' +
        '\t\t\t\t\t\t\t\t\t\t\t WHERE U.id=?',
    queryAllType:'SELECT COUNT(user_type) AS "countType" FROM `user` WHERE user_type!="wfHKY2B3R4s=" GROUP BY user_type ORDER BY user_type',
    updatePwd:'UPDATE user SET  password=?  WHERE id=?'
};
module.exports = user;