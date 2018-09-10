var express = require('express');
var router = express.Router();
//CSRF token middleware, tokens, protection session, users
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
//Protect all the routes with csrf
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
  //Give the data from the collection
  Product.find(function (err, docs) {
    var productsChunck = [];
    var chunckSize = 3;//3 products per row
    for (let i = 0; i < docs.length; i += chunckSize) {
      productsChunck.push(docs.slice(i, i + chunckSize));
    }
    res.render('shop/index', { title: 'Example', products: productsChunck });
  });
});

router.get('/user/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function (req, res, next) {
  res.render('user/profile');
});

router.get('/user/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
