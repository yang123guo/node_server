var express = require('express');
var router = express.Router();
var url = require('url');
//加载mysql模块
var mysql  = require('mysql');
var dbConfig = require('../db/dbConfig');
var userSql = require('../db/userSql');
var util = require('../utils/util');
var connection = mysql.createConnection( dbConfig.mysql );
//执行创建连接 
connection.connect(function(err) { 
    if(err) { console.log("连接失败"); }
    else{ console.log("连接成功"); }
})
var mes = {
    success: {
        status: true,
        message: '请求成功',
        data: null
    },
    error: {
        status: false,
        message: '请求失败',
        data: null
    }
};

router.get('/queryAll', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    //查
    connection.query(userSql.queryAll, function (err, result) {
        if(err) {
          console.log('查询出错： ',err.message);
          mes.error.data = err.message;
          return mes.error;
        }
        mes.success.data = util.transKey(result);
        res.send(mes.success);
    });
});

module.exports = router;


// var addSqlParams = [params.id, params.name, params.sex];
//增
// connection.query(addSql,addSqlParams,function (err, result) {
//     if(err){
//      console.log('[INSERT ERROR] - ',err.message);
//      return;
//     }             
// });