var mysql  = require("mysql");  
var config = require('config-lite')(__dirname);

var pool  = mysql.createPool(config.mysql);  


var query = function(sql,options,callback)
{
    pool.getConnection(function(err,conn)
    {  
        if(err)
        {  
            if (err) 
            {
               console.log(err)
            }
            callback(err,null,null);  
        }
        else
        {              
            conn.query(sql,options,function(err,results,fields){  
                if (err) 
                {
                   console.log(err)
                   console.log(sql,options)
                }                
                conn.release();  
                callback(err, results, fields);  
            });  
        }  
    });  
};

const querySync = function(conn,sql,options)
{
    return new Promise(function (resolve, reject) {        
        conn.query(sql, options, function(err,results,fields){
             if (err) 
             {
               console.log(err)
               console.log(sql,options)
               reject(err)
             }
             else resolve()             
        });
    });
}

var transaction = function(sqls,callback) 
{
    pool.getConnection(function(err,conn)
    {   
        conn.beginTransaction(function(err) {
           if (err) return callback(err);
           sqls.reduce(function(promise, sql) {
               return promise.then(function(){
                  return querySync(conn, sql.exec, sql.options);
               });
           },Promise.resolve())
           .then(function(){
              console.log("commit !")
              conn.commit(function(err) {
                 if (err) 
                 {
                   return conn.rollback(function() {
                      console.log("error2! rollback: " + err)
                      callback(err);
                   });
                 }
                 else
                 {
                   callback(null);
                 } 
              });
           })
           .catch(function(err) {
              conn.rollback(function() {                
                console.log("error1! rollback: "+ err)
                callback(err);
              });             
           });
        });
    });  
}

let database = 
{
    query : query,
    transaction : transaction,
}
module.exports = database;