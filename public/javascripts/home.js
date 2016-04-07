$(document).ready(function() {
  renderRecipes(userRecipes);
});

function renderRecipes(recipes) {
  // Clear the current recipe cells
  $('.recipeCells').empty();
  
  // Create new cells from the given recipes
  var $template = $('#cellTemplate');

  // Clone the template for each given recipe
  for (i = 0; i < recipes.length; i++) {
    var $clone = $template
                   .clone()
                   .removeClass('hide')
                   .removeAttr('id');
    console.log($clone.find('*'));
    $clone.find('h4.title').html(recipes[i].title);
    $clone.find('p.description').html(recipes[i].description);
    $clone.find('theme').html(recipes[i].theme);
    $('.recipeCells').append($clone);
  }
}
