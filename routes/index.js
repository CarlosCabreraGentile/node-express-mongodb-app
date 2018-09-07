var express = require('express');
var router = express.Router();
var Product = require('../models/product');
//CSRF token middleware, tokens, protection session, users
var csrf = require('csurf');

var csrfProtection = csrf();
//Protect all the routes with csrf
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  //Give the data from the collection
  Product.find(function(err, docs){
    var productsChunck = [];
    var chunckSize = 3;//3 products per row
    for (let i = 0; i < docs.length; i += chunckSize) {
      productsChunck.push(docs.slice(i, i+ chunckSize));      
    }
    res.render('shop/index', { title: 'Example', products: productsChunck });
  });
});

router.get('/user/signup', function(req, res, next){
  res.render('user/signup', {csrfToken: req.csrfToken()})
});

router.post('/user/signup', function(req, res, next){
  res.redirect('/');
});

module.exports = router;
