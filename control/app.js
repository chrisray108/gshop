var createError = require('http-errors');
var express = require('express');
var path    = require('path');
var cookieParser = require('cookie-parser');
var logger  = require('morgan');
var expressSanitizer = require('express-sanitizer');
var expressValidator = require('express-validator');
var session          = require('express-session');
var config           = require('config-lite')(__dirname);


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


app.use(session(config.session));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9002");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else
    next();
});

app.use('/login', loginRouter); 

/* 先关掉 session 权限

app.use('/', function(req, res, next){
    var sess = req.session;
    var loginUser = sess.loginId;
    var isLogined = !!loginUser;
    if(isLogined) next();
    else
    res.status(417).send();
});

*/

app.use('/', indexRouter);
app.use('/user', usersRouter);




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
