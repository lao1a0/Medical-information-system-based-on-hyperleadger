var access_history_info = {
    insert: 'INSERT INTO access_history_info(id,mid,vid,vtype,time,status) VALUES(?,?,?,?,?,?)',
    queryDoctor:'SELECT a.`status`,p.`idNum`,a.`id` AS aid,a.`vid` AS vid,p.`id`AS pid,e.`id`AS eid,a.`time`,a.`vtype`,e.`createTime`,d.`hospital`,d.`section`,u.`email` as name  FROM access_history_info a\n' +
        'JOIN electronic_medical_record e ON a.`mid`=e.`id`\n' +
        'JOIN doctor_info d ON e.`doctorId`= d.`id`\n' +
        'JOIN `user` u ON u.`id`=a.`vid`\n' +
        'JOIN patient_info p ON p.`id`=e.`patientId` WHERE p.`id`=? ORDER BY TIME DESC',
    queryDoctorPass:'SELECT a.`status`,p.`idNum`,a.`id` AS aid,d.`id` AS did,p.`id`AS pid,e.`id`AS eid,a.`time`,a.`vtype`,e.`createTime`,d.`hospital`,d.`section`,u.`email` as name\n' +
        '        FROM access_history_info a \n' +
        '        JOIN electronic_medical_record e ON a.`mid`=e.`id`\n' +
        '        JOIN doctor_info d ON e.`doctorId`= d.`id`\n' +
        '        JOIN `user` u ON u.`id`=a.`vid`\n' +
        '        JOIN patient_info p ON p.`id`=e.`patientId` WHERE p.`id`=? AND a.`status`="aOhvS50kC8Y=" ORDER BY TIME DESC',
    queryDoctorNotPass :'SELECT a.`status`,p.`idNum`,a.`id` AS aid,d.`id` AS did,p.`id`AS pid,e.`id`AS eid,a.`time`,a.`vtype`,e.`createTime`,d.`hospital`,d.`section`,u.`email` as name\n' +
        '        FROM access_history_info a \n' +
        '        JOIN electronic_medical_record e ON a.`mid`=e.`id`\n' +
        '        JOIN doctor_info d ON e.`doctorId`= d.`id`\n' +
        '        JOIN `user` u ON u.`id`=a.`vid`\n' +
        '        JOIN patient_info p ON p.`id`=e.`patientId` WHERE p.`id`=? AND a.`status`="50DpbXVyTbc=" ORDER BY TIME DESC',
    updateStatus: 'UPDATE access_history_info SET `status`=? WHERE `mid`=? and `vid`=?',
    queryId:'SELECT a.`id`,a.`mid`,a.`vid`,a.`status`,a.`time`,p.`idNum` FROM access_history_info a \n' +
        '\tJOIN electronic_medical_record e ON a.`mid` = e.`id`\n' +
        '\tJOIN patient_info p ON p.`id` =e.`patientId`\n' +
        '\tWHERE mid=? AND vid=? ORDER BY a.`time` DESC',
    deleteAllaccessHistory:'DELETE FROM access_history_info a WHERE a.`id` IN ( SELECT * FROM (SELECT a.`id` FROM  access_history_info a \n' +
        '   JOIN electronic_medical_record e ON e.`id`=a.`mid`\n' +
        ' WHERE e.`patientId`=? ) AS t)',
    updateStatusById:"UPDATE access_history_info a SET a.`status`='50DpbXVyTbc=' WHERE a.`vid`=?"

}
module.exports = access_history_info;
