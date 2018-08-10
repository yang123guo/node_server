var express = require('express');
var router = express.Router();
var url = require('url');
//加载mysql模块
var mysql = require('mysql');
var dbConfig = require('../db/dbConfig');
var userSql = require('../db/userSql');
var util = require('../utils/util');
var connection = mysql.createConnection(dbConfig.mysql);
//执行创建连接 
connection.connect(function(err) {
    if (err) { console.log("连接失败"); } else { console.log("连接成功"); }
})
var mes = {
    success: {
        code: 0,
        message: null,
        messageArgs: null,
        data: null,
        success: true,
        notSuccess: false
    },
    error: {
        code: 1,
        message: null,
        messageArgs: null,
        data: null,
        success: false,
        notSuccess: true
    }
};

router.get('/queryAll', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    //查
    connection.query(userSql.queryAll, function(err, result) {
        if (err) {
            console.log('查询出错： ', err.message);
            mes.error.data = err.message;
            return mes.error;
        }
        mes.success.data = util.transKey(result);
        console.log(mes.success.data)
        res.send(mes.success);
    });
});


router.post('/querylist', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    const {
        pageNo,
        pageSize,
        promotionId,
        promotionName,
        promotionType,
        promotionStatus,
        beginTime,
        endTime,
        createBy
    } = req.body;


    let querySql = `SELECT * FROM PROMOTION `;
    let queryCount = `SELECT count(*) as count FROM PROMOTION `;

    var tranAnd = function(origin, code, type = 'String') {
        let value;
        switch (type) {
            case 'Number':
                value = Number(origin)
                break;
            case 'String':
                value = `'${origin}'`
            default:
                value = `'${origin}'`
        }
        // origin 不要传入 0 作为有意义的值，除了pageNo
        return origin ? ` and ${util.changeUpper(code)} = ${value}` : '';
    }

    var testType = function(param) {
        return Object.prototype.toString.call(param).slice(8, -1);
    }

    var tranAddObj = {
        promotionId: 'String',
        promotionName: 'String',
        promotionType: 'Number',
        promotionStatus: 'Number',
        createBy: 'String',
    };

    var queryCode = function(obj) {
        let origin = '';
        for (let key in obj) {
            // key 为 promotionId   obj[key] 为 ''
            if (Object.keys(tranAddObj).includes(key)) {
                origin += tranAnd(obj[key], key, tranAddObj[key])
            }
        }
        return origin ? 'WHERE' + origin.slice(4) : '';
    }

    var queryLimit = function(obj) {
        let beginNo = obj.pageNo * obj.pageSize;
        return ` limit ${beginNo},${obj.pageSize}`;
    }

    let querySql1 = querySql + queryCode(req.body) + queryLimit(req.body);

    let querySql2 = queryCount + queryCode(req.body);


    // 查
    connection.query(querySql1, function(err, result) {
        if (err) {
            console.log('查询出错： ', err.message);
            mes.error.data = err.message;
            return mes.error;
        }
        var resData = {
            totalCount: 0,
            list: []
        }
        connection.query(querySql2, function(err, result1) {
            mes.success.data = resData;
            var resList = util.transKey(result);
            mes.success.data.list = resList;
            var result2 = JSON.parse(JSON.stringify(result1));
            const { count: totalCount } = result2[0];
            mes.success.data.totalCount = totalCount;
            console.log(totalCount);
            res.send(mes.success);
        })
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