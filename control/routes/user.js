var express  = require('express');
var router   = express.Router();
var query    = require("../base/db-pool");  
const uuidv1 = require('uuid/v1');
var moment   = require('moment');
var sanitizer = require('sanitizer');

var userSqlMap = {
    insert: 'INSERT INTO MU_MANAGERS(manager_id, manager_pwd, manager_createtime, manager_nick, manager_avatar, manager_email) VALUES (?,?,?,?,?,?)',
    deleteById: 'update mu_managers set manager_valid = 0 where manager_id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'SELECT manager.manager_id,\
                  manager.manager_createtime,\
                  manager.manager_nick,\
                  manager.manager_avatar,\
                  manager.manager_email\
           FROM mu_managers\
           AS manager LEFT OUTER JOIN mu_managers_authority AS authority ON manager.manager_id = authority.manager_id\
           WHERE manager.manager_valid=1',
    getById: 'SELECT manager.manager_id, \
                     manager.manager_nick,\
                     manager.manager_avatar,\
                     manager.manager_email\
              FROM mu_managers AS manager \
              WHERE manager.manager_valid=1 and manager.manager_id=?',
};



var addUser = function(req, res, next){
    req.assert('password', 'password is required').notEmpty()         
    
    var errors = req.validationErrors()
    
    if( !errors ) 
    {
        var user = {
            userId  :   uuidv1(),
            email   :   req.sanitize('email').escape(),
            nick    :   req.sanitize('nick').escape(),
            avatar  :   req.sanitize('avatar').escape(),
            pwd     :   req.sanitize('password').escape(),
            timetag :   moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        query(userSqlMap.insert, [user.userId, user.pwd, user.timetag, user.nick, user.avatar, user.email], function(err, result) {
            if (err) {
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                
                res.status(200).send(user);
            }
        })
    }
    else 
    {  
        var error_msg = '';
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        });
        res.status(414).send('Sorry, The param is not passed: ' + error_msg);            
    }
};



router.get('/query', function(req, res, next) {

    var uid = sanitizer.escape(req.uid);
    if (uid == undefined)
    {
        uid = req.session.loginId;
    }
    query(userSqlMap.getById, uid, function(err,results,fields){  
       if (err) throw err   
       var user = results[0];
       if(user != undefined)
       {
          resolveUserAvatar([user]);         
          res.status(200).send({"res":user});          
       }
       else
       {
          res.status(414).send();
       }       
    }); 
});


router.get('/queryList', function(req, res, next) {    
    query(userSqlMap.list, null, function(err,results,fields)
    {
        if (err) throw err 
        resolveUserAvatar(results);           
        res.status(200).send({"res":results});          
    });        
});



router.post('/regist', addUser);
router.post('/add', addUser);



router.post('/remove', function(req, res, next) {
    req.assert('userId', 'user id is required').notEmpty()  
    var errors = req.validationErrors()
    if( !errors ) 
    {
        query(userSqlMap.deleteById, req.body.userId, function(err,results,fields){  
            if (err) throw err
            res.status(200).send(results);     
        });
    }
    else
    {
        var error_msg = '';
        errors.forEach(function(error) 
        {
            error_msg += error.msg + '<br>'
        })
        res.status(414).send('Sorry, The param is not passed: ' + error_msg);
    }    
});


function resolveUserAvatar(users)
{
    if (users != undefined)
    {
        users.forEach(function(user){
           user.manager_avatar = sanitizer.unescapeEntities(user.manager_avatar);
        });
    }    
}



module.exports = router;
