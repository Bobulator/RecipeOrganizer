var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
  id: Schema.Types.ObjectId,
  owner: String,
  title: String,
  description: String,
  theme: String,
  ingredients: [{
    ingredient: String,
    amount: Number,
    unit: String
  }],
  instructions: [{
    instruction: String
  }],
  notes: String
});

module.exports = mongoose.model('Recipe', Recipe);
