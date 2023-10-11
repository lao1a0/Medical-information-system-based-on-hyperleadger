var patient_info = {
    insert: 'INSERT INTO patient_info(id,name,age,sex,idNum,tel,residence,company,birth) VALUES(?,?,?,?,?,?,?,?,?)',
    queryId: 'SELECT * FROM patient_info WHERE id=?',
    update: 'UPDATE patient_info SET name=?, age=?, sex=?, idNum=?, tel=?, residence=?, company=?, birth=? WHERE id=?',
    updateNoBNoI: 'UPDATE patient_info SET name=?, age=?, sex=?, tel=?, residence=?, company=? WHERE id=?'
};
module.exports = patient_info;
