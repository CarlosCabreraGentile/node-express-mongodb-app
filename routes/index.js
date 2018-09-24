var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
  //Give the data from the collection
  Product.find(function (err, docs) {
    var productsChunck = [];
    var chunckSize = 3;//3 products per row
    for (let i = 0; i < docs.length; i += chunckSize) {
      productsChunck.push(docs.slice(i, i + chunckSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productsChunck });
  });
});

module.exports = router;
