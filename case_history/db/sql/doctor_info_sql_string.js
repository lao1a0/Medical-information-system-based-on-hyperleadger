let doctor_info = {
    delete_doctor: 'DELETE U,doctor_info FROM `user` AS U  LEFT OUTER JOIN doctor_info ON U.id=doctor_info.id  WHERE doctor_info.hospital=?',
    delete_doctor_one:'DELETE U,doctor_info FROM `user` AS U  LEFT OUTER JOIN doctor_info ON U.id=doctor_info.id  WHERE U.id=?',
    insert: 'INSERT INTO doctor_info (id, `name`, `age`, `sex`, `idNum`, `tel`, `hospital`, `description`, `rank`, `section`)  VALUES(?,?,?,?,?,?,?,?,?,?)',
    queryId: 'SELECT * FROM doctor_info WHERE id=?',
    queryemail: 'SELECT d.`id`,d.name,d.age,d.sex,d.idNum,d.tel,d.description,d.hospital,d.rank,d.section,u.`email` FROM doctor_info d LEFT JOIN `user` u ON d.id=u.id WHERE email=?',
    queryHospital: 'SELECT doctor_info.*,user.`email` FROM doctor_info INNER JOIN `user` ON doctor_info.id=`user`.id WHERE hospital=?',
    update: 'UPDATE doctor_info SET `name`=?, `age`=?, `sex`=?, `idNum`=?, `tel`=?,`hospital`=?, `description`=?,`rank`=?,`section`=?  WHERE `id`=?',
    updateExpD: 'UPDATE doctor_info SET `name`=?, `age`=?, `sex`=?, `idNum`=?, `tel`=?,`hospital`=?, `rank`=?,`section`=?  WHERE `id`=?',
    updateExpRS: 'UPDATE doctor_info SET `name`=?, `age`=?, `sex`=?, `idNum`=?, `tel`=?,`hospital`=? WHERE `id`=?'
};
module.exports = doctor_info;
