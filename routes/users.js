var express = require('express');
var router = express.Router();

var users = require('../data/users');

/* GET users listing. */
router.route('/')
.get(function(req, res) {
  res.render('users/index', {title: 'Users', users: users});
})
.post(function(req, res) {
  if (users[req.body.username]) {
    res.send('Conflict', 409);
  } else {
    users[req.body.username] = req.body;
    res.redirect('/');
  }
});

router.get('/new', function(req, res) {
  res.render('users/new', {title: "New User"});
});

router.route('/:name')
.get(function(req, res, next) {
  var user = users[req.params.name];
  if (user) {
    res.render('users/profile', {title: 'User profile', user: user});
  } else {
    next();
  }
})
.delete(function(req, res, next) {
  if (users[req.params.name]) {
    delete users[req.params.name];
    res.redirect('/');
  } else {
    next();
  }
});

module.exports = router;
