var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Account = require('../models/account.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username.toLowerCase() }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', {info: 'That username is already in use. Please choose another.'});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', function(req, res) {
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
		  return res.render('login', { info: 'Invalid username/password combination.' }); 
	  }
	  failedLogin = false;
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/home');
      });
    }) (req, res, function(err) {
      console.log(err);
	  res.redirect('/login');
	});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/home', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('home', { user : req.user });
	});
});

router.get('/shopping', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('shopping', { user : req.user });
	});
});

router.get('/search', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('search', { user : req.user });
	});
});

router.get('/create', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('create', { user : req.user });
	});
});

router.get('/help', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('help', { user : req.user });
	});
});

// Helper method to make sure users are logged in
function validateUser(req, res, next) {
	if (req.user) {
	  next(req, res);
	} else {
	  res.redirect('/login');
	}
}

module.exports = router;
