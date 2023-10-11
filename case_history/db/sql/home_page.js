var home_page = {
    queryHospital: 'SELECT COUNT(*) AS num,section,"doctor" FROM doctor_info ' +
        'INNER JOIN `user` ON doctor_info.id=`user`.id ' +
        'WHERE hospital=? ' +
        'GROUP BY section ' +
        'UNION SELECT COUNT(*) AS num,middleClass,"medical" ' +
        'FROM medical_info ' +
        'GROUP BY middleClass',
    queryPatient:'SELECT COUNT(*) AS num,a.`time`,"ahi" FROM access_history_info a\n' +
        '\tJOIN electronic_medical_record e ON \n' +
        '\te.`id`=a.`mid`\n' +
        '\tWHERE e.`patientId`=?\n' +
        '\tGROUP BY a.`time`\n' +
        'UNION SELECT COUNT(*),e.`createTime`,"emr" FROM electronic_medical_record e WHERE e.`patientId`=?\n' +
        'GROUP BY e.`createTime`',
    queryDoctor:'SELECT COUNT(*) AS num,a.`time`,"ahi" FROM access_history_info a\n' +
        '\tWHERE a.`vid`=?\n' +
        '\tGROUP BY a.`time`\n' +
        'UNION\n' +
        'SELECT COUNT(*) AS num,e.`createTime`,"emr" FROM electronic_medical_record e\n' +
        '\tWHERE e.`doctorId`=?\n' +
        '\tGROUP BY e.`createTime`',
    queryAccessor:'SELECT COUNT(*) AS num,a.`time` FROM access_history_info a WHERE a.`vid`=? GROUP BY a.`time`'
};
module.exports = home_page;
