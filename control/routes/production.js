var express = require('express');
var router = express.Router();
var query    = require("../base/db-pool");
const uuidv1 = require('uuid/v1');
var moment   = require('moment');
var sanitizer = require('sanitizer');


var productionSqlMap = {
    query:"select category_id as cid, category_name as name from MU_SPU_CATEGORY where category_valid=1 order by category_order",
    add:"insert into MU_SPU_CATEGORY (category_id, category_name, category_create_time, category_order) values (?,?,?,(select case when max(category_order) is null then 1 else max(category_order)+1 end from (select category_order from MU_SPU_CATEGORY)  as total))",
};



router.get('/categoryList', function(req, res, next) {
    query(productionSqlMap.query, null, function(err,results,fields) {
            if (err) {
                console.log(err);
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {     
                console.log(JSON.stringify(results))                       	
                res.status(200).send(results);
            }
        })
});


router.post('/addCategory', function(req, res, next) {
    req.assert('name', 'name is required').notEmpty()             
    var errors = req.validationErrors()    
    if( !errors ) 
    {
        var category = 
        {
            categoryId  :  uuidv1(),
            name        :  req.sanitize('name').escape(),
            timetag     :  moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        query(productionSqlMap.add, [category.categoryId, category.name, category.timetag], function(err,results,fields) 
        {
            if (err) { 
                console.log(err);
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                                
                res.status(200).send(category);
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
