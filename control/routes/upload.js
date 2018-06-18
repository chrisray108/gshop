const qiniu = require("qiniu");
var express  = require('express');
var router   = express.Router();

var accessKey = 'awom5UgkMe8MMeJuHROYRfQ4jpOpU_dE0qcjdP7Q';
var secretKey = '_29PgZigjlnbBsdIr89hLoN1sUms1AzPfKlnwoUe';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let downloadDomain = "chrisray.qiniudn.com"


router.post('/fetchToken', function(req, res, next) {
    var options = {
         scope: "chrisray",
    };

	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uploadToken = putPolicy.uploadToken(mac); 
	res.status(200).send(
		                    {
		                    	"token"  : uploadToken, 
		                        "domain" : downloadDomain
		                    }
		                );   
});

module.exports = router;


