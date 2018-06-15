var express = require('express');
var router = express.Router();
var query    = require("../base/db-pool");
const uuidv1 = require('uuid/v1');
var sanitizer = require('sanitizer');


var specSqlMap = {
    queryOptions:"select option_id as opid, option_name as name from MU_SPEC_OPTION where option_valid=1 order by option_order",
    addOption:"insert into MU_SPEC_OPTION (option_id, option_name) values (?,?)",
    removeOption:"update MU_SPEC_OPTION set option_valid = 0 where option_id = ?"
};



router.get('/specOptionList', function(req, res, next) {
    query(specSqlMap.queryOptions, null, function(err,results,fields) {
            if (err) {
                console.log(err)                        
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {     
                res.status(200).send(results);
            }
        })
});


router.post('/addSpecOption', function(req, res, next) {
    req.assert('name', 'name is required').notEmpty()             
    var errors = req.validationErrors()    
    if( !errors ) 
    {
        var spec = 
        {
            optionId    :  uuidv1(),
            name        :  req.sanitize('name').escape(),
        }
        query(specSqlMap.addOption, [spec.optionId, spec.name], function(err,results,fields) 
        {
            if (err) { 
                console.log(err)
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                                
                res.status(200).send(spec);
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
    
});


router.post('/removeSpecOption', function(req, res, next) {
    req.assert('opid', 'spec option id is required').notEmpty()             
    var errors = req.validationErrors()    
    if( !errors ) 
    {
        let optionId  =  req.sanitize('opid').escape();
        query(specSqlMap.removeOption, optionId, function(err,result) 
        {
            if (err) { 
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                                
                res.status(200).send();
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
    
});






module.exports = router;
