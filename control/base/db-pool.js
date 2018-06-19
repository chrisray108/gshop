var mysql  = require("mysql");  
var config = require('config-lite')(__dirname);

var pool  = mysql.createPool(config.mysql);  


var query = function(sql,options,callback)
{
    pool.getConnection(function(err,conn)
    {  
        if(err)
        {  
            callback(err,null,null);  
        }
        else
        {  
            conn.query(sql,options,function(err,results,fields){  
                conn.release();  
                callback(err, results, fields);  
            });  
        }  
    });  
};


var transaction = function(sqls,callback) 
{
    pool.getConnection(function(err,conn)
    {   
        connection.beginTransaction(function(err) {
           if (err) callback(err);
           for(index in sqls)
           {
                var sql = sqls[index]
                conn.query(sql.exec, sql.options, function(err,results,fields){  
                    if (error) {
                      return conn.rollback(function() {
                         callback(err);
                      });
                    }
                    if (index == sqls.length() - 1) 
                    {
                        conn.commit(function(err) {
                          if (err) 
                          {
                             return conn.rollback(function() {
                                callback(err);
                             });
                          }
                          else
                          {
                             callback(null);
                          }
                        });
                    }                      
                });
            }
        });
    });  
}

let database = 
{
    query : query,
    transaction : transaction,
}
module.exports = database;