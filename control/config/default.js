var session          = require('express-session');
var redisStore       = require('connect-redis')(session);


module.exports = {
  mysql : {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "mu_shop"
  },
  session: {
    name: 'gshop-admin-sid',
    secret: 'Dm3fGUU#!edCn83?wYa8Rgl^#dnDwxDSDSwds',  // 用来对session id相关的cookie进行签名
    store: new redisStore({ host: 'localhost', port: 6379, ttl : 600}),
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,             // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 30 * 60 * 1000  // 有效期，单位是毫秒
    }
  }
};