let url = require('url');  
let dealFn = require('./dealfn.js');

exports.tableData = (req, res) => {
    console.log("tableData")
    let query = url.parse(req.url, true).query,
        pageIndex = +query.pageIndex,
        pageSize = +query.pageSize,
        keyWords = query.keyWords,
        sendData = {
            dataTables: {
                totalPages: 0,
                pageIndex: 0,
                pageSize: 10,
                totalNums: 10,
                rows: []
            },       
            message: "响应成功",
            statusCode: 200
        };

    dealFn.readFileData('message.json').then((data) => {
        let list = data.dataTables.purorderDataTable.rows,
            filterList = [];
        if(!keyWords){
           filterList = list
        }else{
            filterList = list.filter( item => item.data.createName.includes(keyWords))
        }
        let sendList = filterList.slice(pageIndex*pageSize, (pageIndex + 1) *pageSize)                
        sendData.dataTables.rows = sendList;
        sendData.dataTables.pageSize = pageSize || 10;
        sendData.dataTables.totalPages = Math.ceil(filterList.length / sendData.dataTables.pageSize);
        sendData.dataTables.totalNums = filterList.length;
        sendData.dataTables.pageIndex = pageIndex;        
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}


exports.breads = (req, res) => {
    console.log("breads")
    let sendData = {           
            message: "响应成功",
            statusCode: 200
        };

    dealFn.readFileData('bread.json').then((data) => {
        sendData.data = data;               
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}




// 临时测试用
exports.bankaccbastest=(req,res)=>{
    console.log("bankaccbastest");   
    dealFn.readFileData('datajson.json').then((data) => {
        console.log(data);
        sendData = {
            data:data,     
            message: "响应成功",
            statusCode: 200
        };
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}

exports.bankaccbas=(req,res)=>{
    console.log("bankaccbas");
    dealFn.readFileData('bankaccbasHead2.json').then((data) => {
        console.log(data);
        sendData = {
            data:data,     
            message: "响应成功",
            statusCode: 200
        };
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}

exports.bankaccbasub=(req,res)=>{
    console.log("bankaccbasub");
    dealFn.readFileData('bankaccbasBodys2.json').then((data) => {
        console.log(data);
        sendData = {
            data:data,     
            message: "响应成功",
            statusCode: 200
        };
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}


exports.bankaccbasdetail=(req,res)=>{
    console.log("bankaccbasdetail");
    dealFn.readFileData('bankaccbas2.json').then((data) => {
        console.log(data);
        sendData = {
            data:data,     
            message: "响应成功",
            statusCode: 200
        };
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}
exports.columns = (req, res) => {
    console.log("columns")
    let sendData = {
            message: "响应成功",
            statusCode: 200
        };

    dealFn.readFileData('column.json').then((data) => {
        sendData.data =  data;      
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}



exports.datejson = (req, res) => {
    console.log("column")
    let sendData = {
            message: "响应成功",
            statusCode: 200
        };
    dealFn.readFileData('column.json').then((data) => {
        sendData.data =  data;      
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}




exports.deleteItem = (req, res) => {
    let id = req.body.id;
    console.log(id)
    let sendData = {
        message: "操作成功",
        statusCode: 200
    };
    dealFn.readFileData('message.json').then((data) => { 
        data.dataTables.purorderDataTable.rows = data.dataTables.purorderDataTable.rows.filter(item => item.id != id)
        console.log(data)
        dealFn.writeFileData('message.json', data).then(data1 => {
            res.send(data1);
        })
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}

exports.createItem = (req, res) => {
     let {
        code,
        purchaseName,
        createName,
        orderStatus,
        orderTime
    } = req.body;

    let sendData = {
        message: "操作成功",
        statusCode: 200
    };
    dealFn.readFileData('message.json').then((data) => { 
        data.dataTables.purorderDataTable.rows.unshift(
            {
                data:{
                    code, 
                    purchaseName,
                    createName,
                    orderStatus,
                    orderTime
                },
                id: `r${new Date().getTime()}${Math.ceil(Math.random()*10)}`,
                status: '2'
            }
        )
        
        dealFn.writeFileData('message.json', data).then(data1 => {
            res.send(data1);
        })
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}

exports.partnerItem = (req, res) => {
    console.log("columns")
    let sendData = {
            message: "响应成功",
            statusCode: 200
        };

    dealFn.readFileData('partner.json').then((data) => {
        sendData.data =  data;      
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}
exports.listItem = (req, res) => {
    console.log("columns")
    let sendData = {
            message: "响应成功",
            statusCode: 200
        };

    dealFn.readFileData('header.json').then((data) => {
        sendData.data =  data;      
        res.send(sendData);
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}

exports.updateItem = (req, res) => {
    let {
        id,
        code,
        purchaseName,
        createName,
        orderStatus,
        orderTime
    } = req.body;

    let sendData = {
        message: "操作成功",
        statusCode: 200
    };
    dealFn.readFileData('message.json').then((data) => { 
        data.dataTables.purorderDataTable.rows.map(item => {
            if(item.id == id){
                item.data.code = code
                item.data.purchaseName = purchaseName
                item.data.createName = createName
                item.data.orderStatus = orderStatus
                item.data.orderTime = orderTime
            }
        })
        console.log(data)
        dealFn.writeFileData('message.json', data).then(data1 => {
            res.send(data1);
        })
    }, (msg) => {
        sendData.statusCode = 500;
        sendData.message = '没有更多数据';
        res.send(sendData);
    })
}