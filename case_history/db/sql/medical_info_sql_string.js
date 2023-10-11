let medical_info = {
    queryAll: 'SELECT * FROM medical_info WHERE middleClass=? ORDER BY price',
    query: 'SELECT * FROM medical_info ORDER BY middleClass',
    queryName: 'SELECT * FROM medical_info WHERE name=?',
    insert: 'INSERT INTO medical_info (id, `name`, `unit`, `price`, `prescription`, `middleClass`)  VALUES(?,?,?,?,?,?)',
    deleteMedicalOne: 'DELETE FROM medical_info WHERE id=?',
    deleteMedical:'DELETE FROM medical_info',
};
module.exports = medical_info;
