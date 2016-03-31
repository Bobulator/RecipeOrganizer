var should = require('should');
var mongoose = require('mongoose');
var Recipe = require('../models/recipe.js');
var db;

describe('Recipe', function() {
  
    before(function(done) {
      db = mongoose.connect('mongodb://localhost/test');
      done();
    });

    after(function(done) {
      mongoose.connection.close();
      done();
    });

    beforeEach(function(done) {
      var recipe1 = new Recipe({
        owner: 'tester1',
        title: 'recipe1',
        description: 'test recipe 1',
        theme: 'testing',
        ingredients: [{
          ingredient: 'ingredient1',
          amount: 5,
          unit: 'cups'
          },{
          ingredient: 'ingredient2',
          amount: 10,
          unit: 'ounces'
        }],
        instructions: [{
          instruction: 'step1: test',
          },{
          instruction: 'step2: test'
        }],
        notes: 'notes'
      });

      var recipe2 = new Recipe({
        owner: 'tester2',
        title: 'recipe2',
        description: 'test recipe 2',
        theme: 'breakfast',
        ingredients: [{
          ingredient: 'ingredient2',
          amount: 20,
          unit: 'ounces'
        }],
        instructions: [{
          instruction: 'step1: test'
        }],
        notes: 'no notes'
      });

      recipe1.save(function(error) {
        if (error) console.log('error' + error.message);
        recipe2.save(function(error) {
          if (error) console.log('error' + error.message);
          done();
        });
      });

      //recipe2.save(function(error) {
      //  if (error) console.log('error' + error.message);
      //  else console.log('no error');
      //});
      //done();
    });

    it('find a recipe by owner', function(done) {
      Recipe.find({ owner: 'tester1' }, function(err, recipes) {
        recipes.length.should.eql(1);
        recipes[0].owner.should.eql('tester1');
        recipes[0].title.should.eql('recipe1');
      });
      Recipe.find({ owner: 'tester2' }, function(err, recipes) {
        recipes.length.should.eql(1);
        recipes[0].owner.should.eql('tester2');
        recipes[0].title.should.eql('recipe2');
      });
      done();
    });

    it('find a recipe by title', function(done) {
      Recipe.findOne({ title: 'recipe1' }, function(err, recipe) {
        recipe.title.should.eql('recipe1');
        recipe.description.should.eql('test recipe 1');
        recipe.theme.should.eql('testing');
        recipe.ingredients.length.should.eql(2);
        var ing1 = recipe.ingredients[0];
        ing1.ingredient.should.eql('ingredient1');
        ing1.amount.should.eql(5);
        ing1.unit.should.eql('cups');
        var ing2 = recipe.ingredients[1];
        ing2.ingredient.should.eql('ingredient2');
        ing2.amount.should.eql(10);
        ing2.unit.should.eql('ounces');
        recipe.instructions.length.should.eql(2);
        recipe.instructions[0].instruction.should.eql('step1: test');
        recipe.instructions[1].instruction.should.eql('step2: test');
        recipe.notes.should.eql('notes');
        //console.log(recipe);
      });
      Recipe.findOne({ title: 'recipe2' }, function(err, recipe) {
        recipe.title.should.eql('recipe2');
        recipe.description.should.eql('test recipe 2');
        recipe.theme.should.eql('breakfast');
        recipe.ingredients.length.should.eql(1);
        var ing1 = recipe.ingredients[0];
        ing1.ingredient.should.eql('ingredient2');
        ing1.amount.should.eql(20);
        ing1.unit.should.eql('ounces');
        recipe.instructions.length.should.eql(1);
        recipe.instructions[0].instruction.should.eql('step1: test');
        recipe.notes.should.eql('no notes');
        
      });
      done();
    });
    
    it('find a recipe by theme', function(done) {
      Recipe.find({ theme: 'testing' }, function(err, recipes) {
        recipes.length.should.eql(1);
        recipes[0].title.should.eql('recipe1');
      });
      Recipe.find({ theme: 'breakfast' }, function(err, recipes) {
        recipes.length.should.eql(1);
        recipes[0].title.should.eql('recipe2');
      });
      done();
    });

    it('find a recipe by ingredient', function(done) {
      Recipe.find({ 'ingredients.ingredient': 'ingredient1' }, function(err, recipes) {
        recipes.length.should.eql(1);
        recipes[0].title.should.eql('recipe1');
      });
      Recipe.find({ 'ingredients.ingredient': 'ingredient2' }, function(err, recipes) {
        recipes.length.should.eql(2);
        recipes[0].title.should.eql('recipe1');
        recipes[1].title.should.eql('recipe2');
      });
      done();
    });

    afterEach(function(done) {
      Recipe.remove({}, function() {
        done();
      });
    });
});
