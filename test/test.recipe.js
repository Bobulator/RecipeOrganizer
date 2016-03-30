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
      var recipe = new Recipe({
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

      recipe.save(function(error) {
        if (error) console.log('error' + error.message);
        else console.log('no error');
        done();
      });
    });

    it('find a recipe by title', function(done) {
      Recipe.findOne({ title: 'recipe1' }, function(err, recipe) {
        recipe.title.should.eql('recipe1');
        recipe.description.should.eql('test recipe 1');
        recipe.theme.should.eql('testing');
        var ing1 = recipe.ingredients[0];
        ing1.ingredient.should.eql('ingredient1');
        ing1.amount.should.eql(5);
        ing1.unit.should.eql('cups');
        var ing2 = recipe.ingredients[1];
        ing2.ingredient.should.eql('ingredient2');
        ing2.amount.should.eql(10);
        ing2.unit.should.eql('ounces');
        recipe.instructions[0].instruction.should.eql('step1: test');
        recipe.instructions[1].instruction.should.eql('step2: test');
        recipe.notes.should.eql('notes');
        //console.log(recipe);
        done();
      });
    });
    
    it('find a recipe by theme', function(done) {
      Recipe.findOne({ theme: 'testing' }, function(err, recipe) {
        recipe.title.should.eql('recipe1');
        done();
      });
    });

    it('find a recipe by ingredient', function(done) {
      Recipe.findOne({ 'ingredients.ingredient': 'ingredient1' }, function(err, recipe) {
        recipe.title.should.eql('recipe1');
      });
      Recipe.findOne({ 'ingredients.ingredient': 'ingredient2' }, function(err, recipe) {
        recipe.title.should.eql('recipe1');
      });
      done();
    });

    afterEach(function(done) {
      Recipe.remove({}, function() {
        done();
      });
    });
});
