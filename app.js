var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let fs = require('fs');

var routes = require('./routes/route_app');

var app = express();
var ejs = require('ejs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//处理webpack服务请求
app.get('/__webpack_hmr', function(req, res) {
  res.send('')
})

app.get('/', (req, res) => {
    res.redirect('app');
});


app.get(/\/creditTableData[\w\W]*/, routes.tableData)
app.get(/\/creditBreads[\w\W]*/, routes.breads)
app.get(/\/creditcolumns[\w\W]*/, routes.columns)
app.post(/\/creditDeleteItem[\w\W]*/, routes.deleteItem)
app.post(/\/creditCreateItem[\w\W]*/, routes.createItem)
app.post(/\/creditUpdateItem[\w\W]*/, routes.updateItem)
app.get(/\/abc[\w\W]*/, routes.datejson)

app.post(/\/creditUpdateItem[\w\W]*/, routes.updateItem)

app.post(/\/tmc-bd-web\/bd\/bankaccbas\/list[\w\W]*/, routes.bankaccbas)
app.post(/\/tmc-bd-web\/bd\/bankaccbas\/subquery[\w\W]*/, routes.bankaccbasub)
app.post(/\/tmc-bd-web\/bd\/bankaccbas\/form[\w\W]*/, routes.bankaccbasdetail)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
