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
    addDetail :"insert into MU_SPU_DETAIL (detail_id, detail_content) values (?,?)",
    addProduct:"insert into MU_SPU (product_id, product_name, product_desc, \
                product_detail_id, product_category_id, product_status, product_sale_type,\
                product_creator_id, product_create_time, product_sell_count) values (?,?,?,?,?,?,?,?,?,?)",
    addKeep:"insert into MU_SKU(keep_id, product_id, keep_creator_id, keep_create_time, \
             keep_count, keep_unlimited_count, keep_spec_desc) values (?,?,?,?,?,?,?)",
    addPrise:"insert into MU_PRISE (prise_id, product_id,keep_id, \
              prise_value, prise_origin_value, prise_valid_time) \
              values (?,?,?,?,?,?)",
    queryProduct:"select  spu.product_id as pid, spu.product_name as name, \
                  spu.product_desc as description, \
                  spu.product_sell_count as sellCount, \
                  spu.product_category_id as categoryId, min(prise.prise_value) as priseMinValue, \
                  max(prise.prise_value) as priseMaxValue, \
                  min(prise.prise_origin_value) as priseOriginMinValue, \
                  max(prise.prise_origin_value) as priseOriginMaxValue \
                  from mu_spu as spu, mu_prise as prise \
                  where spu.product_id = prise.product_id group by spu.product_id",

};

router.post('/productList', function(req, res, next) {
    database.query(productionSqlMap.queryProduct, null, function(err,results,fields) {
        if (err) {
            res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
        } else {     
            console.log(JSON.stringify(results))                        
            res.status(200).send(results);
        }
    })
})



router.post('/addProduct', function(req, res, next) {
    
    let detail  = insertDetail(req);
    let product = insertProduct(detail.detailId, req)
    let keeps   = insertKeeps(product.productId,req)

    var sqls = [];
    sqls.push(detail);
    sqls.push(product);
    for (index in keeps) 
    {
        sqls.push(keeps[index]);
    }
    database.transaction(sqls,function(err){
        if (err) { 
            console.log("add product error: " + err)
            res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
        } else {                                
            res.status(200).send();
        }
    });
});

function insertDetail(req)
{
    var detail = 
    {
        detailId  :  uuidv1(),
        content   :  req.sanitize('detailContent').escape(),
    }
    let sql= 
    {
        detailId  : detail.detailId,
        exec      : productionSqlMap.addDetail,
        options   : [detail.detailId, detail.content]
    }
    return sql;
}

function insertProduct(detailId, req)
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
        cellCount  :  req.sanitize('sellCount').escape(),
    }
    let sql = 
    {
        productId : product.productId,
        exec      : productionSqlMap.addProduct,
        options   : [product.productId, 
                     product.name, 
                     product.desc, 
                     product.detailId,
                     product.categoryId, 
                     product.status,
                     product.sellType, 
                     product.creatorId, 
                     product.createTime,
                     product.cellCount],
    }
    return sql;
}

function insertKeeps (productId, req)
{
    var sqls = []
    var keeps = req.body.keepItems
    for(index in keeps)
    {
        var item = keeps[index]
        var keep = 
        {
            keepId     : uuidv1(),
            productId  : productId,
            creatorId  : req.session.loginId,
            createTime : moment().format("YYYY-MM-DD HH:mm:ss"),
            keepCount  : sanitizer.escape(item.keepCount),
            unlimitedCount : item.unlimitedCount? '1' : '0',
            sepcDesc   : sanitizer.escape(item.specDesc),                        
        }
        let sql = 
        {
            keepId  : keep.keepId,
            exec    : productionSqlMap.addKeep,
            options : [keep.keepId, 
                       keep.productId, 
                       keep.creatorId, 
                       keep.createTime, 
                       keep.keepCount,
                       keep.unlimitedCount,
                       keep.sepcDesc],
        }
        sqls.push(sql)
        var priseSql = insertPrise(productId, keep.keepId, item)
        sqls.push(priseSql)
    }
    return sqls
}

function insertPrise(productId, keepId, item)
{
    var prise = 
        {
            priseId   : uuidv1(),
            productId : productId,
            keepId    : keepId,
            prise     : sanitizer.escape(item.prise),
            originPrise : sanitizer.escape(item.originPrise),
            validTime   :  moment().format("YYYY-MM-DD HH:mm:ss"),    
        }     
    let sql = 
    {
        priseId : prise.priseId,
        exec    : productionSqlMap.addPrise,
        options : [prise.priseId, 
                   prise.productId,
                   prise.keepId, 
                   prise.prise, 
                   prise.originPrise, 
                   prise.validTime],
    }
    return sql
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
