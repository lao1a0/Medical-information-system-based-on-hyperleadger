var patient_policy = {
    insert: 'INSERT INTO patient_policy(pid) VALUES(?)',
    queryAll: 'SELECT * FROM patient_policy WHERE pid=?',
    updateD: 'UPDATE patient_policy SET pClassD=?,pDetialD=? WHERE pid=?',
    updateV: 'UPDATE patient_policy SET pClassV=?,pDetialV=? WHERE pid=?',
    queryD: 'SELECT pClassD,pDetialD FROM patient_policy WHERE pid=?',
    queryV: 'SELECT pClassV,pDetialV FROM patient_policy WHERE pid=?',
    queryAll: 'SELECT pClassV,pDetialV,pClassD,pDetialD FROM patient_policy WHERE pid=?',
};
module.exports = patient_policy;
