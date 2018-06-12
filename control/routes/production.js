var express = require('express');
var router = express.Router();
var query    = require("../base/db-pool");  

var productionSqlMap = {
	query:"select category_id as cid, category_name as name from MU_SPU_CATEGORY where category_valid=1 order by category_order",
	add:"insert into MU_SPU_CATEGORY (category_id, category_name, category_order) values (?,?,?)",
	querySubCategory:"select category_id as cid, category_name as name from mu_spu_sub_category where category_valid=1 order by category_id desc"
};


/* GET home page. */
router.get('/categoryList', function(req, res, next) {
    query(productionSqlMap.query, null, function(err,results,fields) {
            if (err) {
                console.log(err);
                res.status(400).send('Sorry, The operation couldn’t be completed:' + err);                           
            } else {                            	
                res.status(200).send(results);
            }
        })
});

module.exports = router;
