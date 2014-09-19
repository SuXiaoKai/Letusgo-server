var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();

router.get('/', function(req, res) {
  storage.get('cart',function(err,data){
    res.send(data);
  });
});

router.post('/',function(req,res){
  var cart =  req.param('cart');
  storage.set('cart',JSON.stringify(cart),function(err,obj){
    res.send(obj);
  });
});

module.exports = router;