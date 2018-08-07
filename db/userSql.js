// sql语句
const UserSQL = {  
    insert: 'INSERT INTO PROMOTION(uid,userName) VALUES(?,?)', 
    queryAll: 'SELECT * FROM PROMOTION',  
    getUserById: 'SELECT * FROM PROMOTION WHERE ID = ? ',
};

//SQL语句
// var  sql = 'SELECT * FROM name';
// var  addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';

module.exports = UserSQL;