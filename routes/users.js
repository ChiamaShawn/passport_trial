var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection('SELECT * from Users', function(error,results, fields){
    if(error) throw error;
    res.send(JSON.stringify({"status":200, "error": null, "response": results}))
  })
});

module.exports = router;
