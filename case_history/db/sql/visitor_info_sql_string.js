var doctor_info = {
    insert: 'INSERT INTO visitor_info(id,name, idNum, tel,workplace) VALUES(?,?,?,?,?)',
    queryId: 'SELECT * FROM visitor_info WHERE id=?',
    update: 'UPDATE visitor_info SET name=?, idNum=?, tel=?,workplace=?  WHERE id=?'
};
module.exports = doctor_info;
