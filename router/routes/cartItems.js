var express = require('express');
var router = express.Router();
var redis = require('redis');
var storage = redis.createClient();
var _ = require('lodash');

router.get('/', function(req, res) {
  storage.get('cartItems',function(err,data){
    res.send(data);
  });
});

router.post('/',function(req,res){

  var cartItem =  req.body.cartItem;

  storage.get('cartItems',function(err,data){

    var cartItems = JSON.parse(data) || [];
    var id = 0;
    if(cartItems.length != 0){
      id = cartItems[cartItems.length - 1].id;
    }
    cartItem.id = id + 1;
    cartItems.push(cartItem);

    storage.set('cartItems',JSON.stringify(cartItems),function(err,obj){
      res.send(obj);
    });
  });
});

router.delete('/:id', function(req, res) {

  var id = req.params.id;

  storage.get('cartItems',function(err,data){

    var cartItems = JSON.parse(data);
    _.remove(cartItems,function(cartitem){
      return cartitem.id.toString() === id.toString();
    });

    storage.set('cartItems',JSON.stringify(cartItems),function(err,obj){
      res.send(obj);
    });
  });
});

router.put('/:id', function(req, res) {

  var cartItem = req.body.cartItem;
  var id = req.params.id;

  storage.get('cartItems',function(err,data){

    var cartItems = JSON.parse(data);

    _.find(cartItems,function(item,index){
      if(item.id.toString() === id.toString()){
        cartItems[index] = cartItem;
      }
    });

    storage.set('cartItems',JSON.stringify(cartItems),function(err,obj){
      res.send(obj);
    });
  })
});

module.exports = router;
