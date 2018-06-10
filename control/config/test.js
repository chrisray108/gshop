var session          = require('express-session');
var redisStore       = require('connect-redis')(session);


module.exports = {
  mysql : {
    host: "rm-bp1svrzmg48wfs4z7.mysql.rds.aliyuncs.com",
    port: 3306,
    user: "root",
    password: "root@Root",
    database: "mu_shop"
  },
  session: {
    name: 'gshop-admin-sid',
    secret: 'Dm3fGUU#!edCn83?wYa8Rgl^#dnDwxf1XGa',  // 用来对session id相关的cookie进行签名
    store: new redisStore({ host: 'r-bp1bf338dfea4904.redis.rds.aliyuncs.com',pass:'rootcC123456', port: 6379, ttl : 600}),
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,             // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 600 * 1000  // 有效期，单位是毫秒
    }
  }
};