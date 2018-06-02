var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('print xxxxxx');
  res.render('index', { title: 'diaodiaodiao' });
});

module.exports = router;
