var express = require('express');
var router = express.Router();

var users = require('../data/users');

/*
  Session routes
 */

router.route('/new')
.get(function(req, res) {
  res.render('session/new', {title: 'Log in'});
})

router.route('/')
.post(function(req, res) {
  if (users[req.body.username] &&
    users[req.body.username].password === req.body.password) {
    req.session.user = users[req.body.username];
    res.redirect('/users');
  } else {
    res.redirect('/session/new')
  }
})
.delete(function(req, res, next) {
  req.session.destroy();
  res.redirect('/users');
})

module.exports = router;
