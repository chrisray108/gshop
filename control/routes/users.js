var express  = require('express');
var router   = express.Router();
var query    = require("../base/db-pool");  
const uuidv1 = require('uuid/v1');
var moment   = require('moment');

var userSqlMap = {
    insert: 'INSERT INTO MU_MANAGERS VALUES (?,?,?,?,?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'select * from MU_MANAGERS left outer join MU_MANAGERS_AUTHORITY \
    	on MU_MANAGERS.MANAGER_ID = MU_MANAGERS_AUTHORITY.MANAGER_ID',
    getById: 'select * from user where id = ?'
};



router.get('/query', function(req, res, next) {
    query(userSqlMap.list,function(err,results,fields){  
  	if (err) throw err
    res.status(200).send(results);          
  });
});


router.post('/add', function(req, res, next) {
	req.assert('token', 'token is required').notEmpty()         
    
    var errors = req.validationErrors()
    
    if( !errors ) {
        var user = {
        	userId  :   uuidv1(),
            nick    :   req.sanitize('nick').escape(),
            avatar  :   req.sanitize('avatar').escape(),
            token   :   req.body.token,
            timetag :   moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        console.log([user.userId, user.token, user.timetag, user.nick, user.avatar]);
        query(userSqlMap.insert, [user.userId, user.token, user.timetag, user.nick, user.avatar], function(err, result) {
            if (err) {
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                
                res.status(200).send(user);
            }
        })
    }
    else {  
        var error_msg = '';
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        res.status(414).send('Sorry, The param is not passed: ' + error_msg);            
    }
});



module.exports = router;
