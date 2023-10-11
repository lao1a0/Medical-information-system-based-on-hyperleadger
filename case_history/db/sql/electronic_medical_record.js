var electronic_medical_record_info = {
    insert: 'INSERT INTO electronic_medical_record(id,patientId,doctorId,createTime,section) VALUES(?,?,?,?,?)',
    queryIdPatient: 'SELECT p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`rank`,d.`name` AS dname,d.`hospital`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid FROM electronic_medical_record e\n' +
        'JOIN doctor_info d\n' +
        'ON e.doctorId=d.id\n' +
        'JOIN patient_info p\n' +
        'ON e.`patientId`=p.`id` WHERE patientId=? order by e.`createTime`',
    queryIdPatientAll: 'SELECT p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`rank`,d.`name` AS dname,d.`hospital`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid FROM electronic_medical_record e\n' +
        'JOIN doctor_info d\n' +
        'ON e.doctorId=d.id\n' +
        'JOIN patient_info p\n' +
        'ON e.`patientId`=p.`id` order by section',
    queryIdPatientAllChange: 'SELECT a.`status`,e.`id` AS eid , p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`rank`,d.`name` AS dname,d.`hospital`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did\n' +
        'FROM electronic_medical_record e\n' +
        'JOIN doctor_info d ON e.doctorId=d.id\n' +
        'JOIN patient_info p ON e.`patientId`=p.`id` \n' +
        'LEFT JOIN (SELECT * FROM access_history_info WHERE vid=?) a ON a.`mid`=e.`id`\n' +
        'ORDER BY section',
    queryIdcreateTime: 'SELECT p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`name` AS dname,d.`rank`,d.`hospital`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid FROM electronic_medical_record e\n' +
        'JOIN doctor_info d\n' +
        'ON e.doctorId=d.id\n' +
        'JOIN patient_info p\n' +
        'ON e.`patientId`=p.`id` WHERE p.`id`=? and createTime like ? ORDER BY createTime',
    queryTel: 'SELECT p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`name` AS dname,d.`hospital`,d.`rank`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid FROM electronic_medical_record e\n' +
        'JOIN doctor_info d\n' +
        'ON e.doctorId=d.id\n' +
        'JOIN patient_info p\n' +
        'ON e.`patientId`=p.`id` WHERE p.`tel`=? ORDER BY createTime,section',
    queryTelChange:'SELECT a.`status`,e.`id` AS eid ,p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`name` AS dname,d.`hospital`,d.`rank`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did\n' +
        '\tFROM electronic_medical_record e\n' +
        '        JOIN doctor_info d ON e.doctorId=d.id\n' +
        '        JOIN patient_info p ON e.`patientId`=p.`id` \n' +
        '        LEFT JOIN (SELECT * FROM access_history_info WHERE vid=?) a ON a.`mid`=e.`id`\n' +
        '        WHERE p.`tel`=? \n' +
        '        ORDER BY createTime,section',
    querySection: 'SELECT p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`name` AS dname,d.`hospital`,d.`rank`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid FROM electronic_medical_record e\n' +
        'JOIN doctor_info d\n' +
        'ON e.doctorId=d.id\n' +
        'JOIN patient_info p\n' +
        'ON e.`patientId`=p.`id` WHERE d.`section`=? ORDER BY createTime',
    querySectionChange:'SELECT a.`status`,p.`name` AS pname,p.`age`,p.`sex`,p.`idNum`,p.`birth`,p.`tel`,p.`company`,p.`residence`,d.`name` AS dname,d.`hospital`,d.`rank`,d.`section`,d.`tel` AS dtel,e.`createTime`,p.`id` AS pid,d.`id` AS did,e.`id` AS eid \n' +
        '\tFROM electronic_medical_record e\n' +
        '        JOIN doctor_info d ON e.doctorId=d.id\n' +
        '        JOIN patient_info p ON e.`patientId`=p.`id`\n' +
        '        LEFT JOIN (SELECT * FROM access_history_info WHERE vid=?) a ON a.`mid`=e.`id`\n' +
        '        WHERE d.`section`=? ORDER BY createTime',
    update: 'UPDATE electronic_medical_record SET patientId=?,doctorId=?,createTime=? WHERE id=?'
}
module.exports = electronic_medical_record_info;
