var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var LocalStrategy = require('passport-local');
var Account = require('../models/account.js');
var Recipe = require('../models/recipe.js');
var router = express.Router();

// GETS

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
    if (Object.keys(req.query).length === 0) {
	    Recipe.count( { owner: req.user.username }, function(err, count) {
        // Send some initial recipes to populate the home screen with
        if (count <= 20) {
          Recipe.find( { owner: req.user.username }, function(err, results) {
            if (err) { console.log(err); }
            res.render('home', { user : req.user, recipes : JSON.stringify(results) });
          });
        } else {
          Recipe.plugin(random);
          Recipe.findRandom( { user : req.user }, {}, function(err, results) {
            if (err) { console.log(err); }
            res.render('home', { user : req.user, recipes : JSON.stringify(results) });
          });
        }
      });
    } else {
      Recipe.find( { owner: req.user.username, 
                     title: new RegExp(req.query.search, 'i') }, function(err, results) {
        if (err) { console.log(err); }
        res.render('home', { user : req.user, recipes : JSON.stringify(results) });
      });
    }
	});
});

router.get('/shopping', function(req, res) {
	validateUser(req, res, function(req, res) {
	  res.render('shopping', { user : req.user });
	});
});

router.get('/search', function(req, res) {
	validateUser(req, res, function(req, res) {
	  if (Object.keys(req.query).length === 0) {
      res.render('search', { user : req.user }); 
    } else {
      console.log('Received search request:');
      console.log(req.query);
      Recipe.find({ 
        owner: req.user.username,
        title: new RegExp(req.query.title, 'i'),
        'ingredients.ingredient': new RegExp(req.query.ingredient, 'i'),
        theme: new RegExp(req.query.theme, 'i')
      }, function(err, results) {
        if (err) console.log('error' + error.message);
        console.log(results);
        res.send(results);
      });
    }
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

router.get('/getrecipe', function(req, res) {
  validateUser(req, res, function(req, res) {
    Recipe.findOne( { '_id' : req.query.recipeID }, function(err, result) {
      if (err) { console.log(err); }
      console.log(result);
      res.status(200).json(result);
    });
  });
});

// POSTS

router.post('/create', function(req, res) {
  validateUser(req, res, function(req, res) {
    console.log('Received recipe POST request:');
    console.log(req.body);

    var ingredients = [];
    if (typeof req.body.ingredients_ingredient === 'string') {
      ingredients[0] = {
        ingredient: req.body.ingredients_ingredient,
        amount: req.body.ingredients_amount,
        unit: req.body.ingredients_unit
      };
    } else {
      for (i = 0; i < req.body.ingredients_ingredient.length; i++) {
        ingredients[i] = {
          ingredient: req.body.ingredients_ingredient[i],
          amount: req.body.ingredients_amount[i],
          unit: req.body.ingredients_unit[i]
        };
      }
    }

    var instructions = [];
    if (typeof req.body.instructions_instruction === 'string') {
      instructions[0] = {
        instruction: req.body.instructions_instruction
      };
    } else {
      for (i = 0; i < req.body.instructions_instruction.length; i++) {
        instructions[i] = {
          instruction: req.body.instructions_instruction[i]
        };
      }
   }
  
    var recipe = new Recipe({
      owner: req.user.username,
      title: req.body.title,
      description: req.body.description,
      theme: req.body.theme,
      ingredients: ingredients,
      instructions: instructions,
      notes: req.body.notes
    });

    recipe.save(function(error) {
      if (error) console.log('error in posting recipe' + error.message);
      else res.redirect('/create');
    });
  });
});

router.post('/search', function(req, res) {
  validateUser(req, res, function(req, res) {
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
