var express = require('express');
var router = express.Router();




router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new',  function(req,res, next){
  res.send('You are so cool');
});

module.exports = router;
