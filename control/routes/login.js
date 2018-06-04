var express = require('express');
var router = express.Router();




/* GET home page. */
router.post('/loginByEmail', function(req, res, next) {
  console.log('print loginByEmail');
  res.status(200).send('ojbk');          
});

module.exports = router;