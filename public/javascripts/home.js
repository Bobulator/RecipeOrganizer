$(document).ready(function() {
  renderRecipes(userRecipes);

  $('.recipeCells').on('click', '.recipeImage', function() {
    console.log('clicked image!');
    var url = 'getrecipe?recipeID=' + $(this).parent().parent().parent().attr('_id');
    console.log($(this).parent().parent().parent().attr('_id'));
    $.getJSON(url, function(result) {
      console.log(result);

      // Populate header with title, description, and theme
      $('#recipeModal').find('h3.modal-title').html(result.title);
      $('#recipeModal').find('p.modal-description').html(result.description);
      $('#recipeModal').find('p.modal-theme').html('Theme: ' + result.theme);
      
      // List ingredients
      $('#recipeModal').find('ul.modal-ingredients').empty();
      for (i = 0; i < result.ingredients.length; i++) {
        var ingredient = "<li>" + result.ingredients[i].amount + " ";
        ingredient += result.ingredients[i].unit === "None" ? "" : result.ingredients[i].unit;
        if (result.ingredients[i].amount > 1 && result.ingredients[i].unit !== "None") {
          ingredient += "s";
        }
        ingredient += " " + result.ingredients[i].ingredient + "</li>";
        $('#recipeModal').find('ul.modal-ingredients').append(ingredient);
      }

      // List instructions
      $('#recipeModal').find('ol.modal-instructions').empty();
      for (i = 0; i < result.instructions.length; i++) {
        var instruction = "<li>" + result.instructions[i].instruction + "</li>";
        $('#recipeModal').find('ol.modal-instructions').append(instruction);
      }
      
      // Show notes
      $('#recipeModal').find('p.modal-notes').html(result.notes);

      // Reveal Modal
      $('#recipeModal').modal({show:true});
    });  
  });
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
                   .attr('_id', recipes[i]._id);
    $clone.find('h4.title').html(recipes[i].title);
    $clone.find('p.description').html(recipes[i].description);
    $clone.find('theme').html(recipes[i].theme);
    $('.recipeCells').append($clone);
  }
}
