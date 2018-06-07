var createError = require('http-errors');
var express = require('express');
var path    = require('path');
var cookieParser = require('cookie-parser');
var logger  = require('morgan');
var expressSanitizer = require('express-sanitizer');
var expressValidator = require('express-validator');
var session          = require('express-session');
var redisStore       = require('connect-redis')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(session({
    name: 'gshop-admin-sid',
    secret: 'Dm3fGUU#!edCn83?wYa8Rgl^#dnDwxf1XGa',  // 用来对session id相关的cookie进行签名
    store: new redisStore({ host: 'localhost', port: 6379, ttl : 600}),
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,             // 是否每次都重新保存会话，建议false
    cookie: {
        httpOnly: true,
        maxAge: 600 * 1000  // 有效期，单位是毫秒
    }
}));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9002");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else
    next();
});


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('404: method not find\n');
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
