var express   = require('express');
var router    = express.Router();
var query     = require("../base/db-pool");
var errorCode = require("../base/error-code");


var sqlMap = {
    loginByEmail: 'select manager_id from mu_managers where manager_email = ? and manager_pwd = ? and manager_valid = 1',
};


router.post('/loginByEmail', function(req, res, next) {

    req.assert('password', 'password is required').notEmpty()             
    req.assert('email', 'email is required').notEmpty()   
    var errors = req.validationErrors()
    
    if( !errors ) 
    {
        var user = {
            email   :   req.sanitize('email').escape(),
            token   :   req.sanitize('password').escape(),
        }
        query(sqlMap.loginByEmail, [user.email, user.token], function(err, result) {
            if (err)
            {
                res.status(errorCode.queryFailed).send('Sorry, The operation couldn’t be completed:' + err);                           
            }
            else
            {
            	if (result.length) 
            	{
            		  req.session.regenerate(function(err) {
                           if(err)
                           {
                               return res.status(errorCode.serverError).send();;                
                           }            
                           req.session.loginId = result[0].manager_id;
                           res.status(errorCode.success).send({"sid":req.session.loginId});
                       });                       
            	}
            	else
            	{
            		console.log("login failed : " + user.email + ":" + user.token);
            		res.status(errorCode.loginFailed).send();
            	}
            }
        })
    }
    else 
    {  
        var error_msg = '';
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        });
        res.status(errorCode.paramInvalid).send('Sorry, The param is not passed: ' + error_msg);            
    }
});

module.exports = router;