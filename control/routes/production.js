var express = require('express');
var router = express.Router();
var database    = require("../base/db-pool");
const uuidv1 = require('uuid/v1');
var moment   = require('moment');
var sanitizer = require('sanitizer');


var productionSqlMap = {
    query:"select category_id as cid, category_name as name from MU_SPU_CATEGORY where category_valid=1 order by category_order",
    add:"insert into MU_SPU_CATEGORY (category_id, category_name, category_create_time, category_order) values (?,?,?,(select case when max(category_order) is null then 1 else max(category_order)+1 end from (select category_order from MU_SPU_CATEGORY)  as total))",
    remove:"update MU_SPU_CATEGORY set category_valid = 0 where category_id = ?",
    addDetail :"insert into MU_SPU_DETAIL (detail_id, detailContent) values (?,?)",
    addProduct:"insert into MU_SPU (product_id, product_name, product_desc, )",
};


router.post('/addProduct', function(req, res, next) {
    
    let sql1 = addDetail(req);

    var productId = uuidv1()

    //database.transaction();
});

function addDetail(req)
{
    var detail = 
    {
        detailId  :  uuidv1(),
        content   :  req.sanitize('detailContent').escape(),
    }
    let sql= 
    {
        detailId  : detailId
        exec      : productionSqlMap.addDetail,
        options   : [detail.detailId, detail.content]
    }
    return sql;
}

function addProduct(detailId, req)
{
    var product = 
    {
        productId  :  uuidv1(),
        name       :  req.sanitize('name').escape(),
        desc       :  req.sanitize('desc').escape(),
        detailId   :  detailId,
        categoryId :  req.sanitize('categoryId').escape(),
        status     :  req.sanitize('status').escape(),
        sellType   :  '3',
        creatorId  :  req.session.loginId,
        createTime :  moment().format("YYYY-MM-DD HH:mm:ss"),
    }
    let sql= 
    {
        detailId  : detailId
        exec      : productionSqlMap.addDetail,
        options   : [detail.detailId, detail.content]
    }
    return sql;
}


router.get('/categoryList', function(req, res, next) {
    database.query(productionSqlMap.query, null, function(err,results,fields) {
            if (err) {
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
        database.query(productionSqlMap.add, [category.categoryId, category.name, category.timetag], function(err,results,fields) 
        {
            if (err) { 
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


router.post('/removeCategory', function(req, res, next) {
    req.assert('cid', 'category id is required').notEmpty()             
    var errors = req.validationErrors()    
    if( !errors ) 
    {
        let categoryId  =  req.sanitize('cid').escape();
        database.query(productionSqlMap.remove, categoryId, function(err,result) 
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
