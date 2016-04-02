$(document).ready(function() {
  var ingredientIndex = 0;
  var instructionIndex = 0;
  
  // When the add button gets clicked create a new ingredient form by cloning the hidden template
  $('.addIngredientButton').click(function() {
      console.log("In add ingredient button");
      ingredientIndex++;

      var $template = $('#ingredientTemplate');
    
      // Clone the template
      var $clone = $template
                     .clone()
                     .removeClass('hide')
                     .removeAttr('id')
                     .attr('data-ingredient-index', ingredientIndex)
                     .insertBefore($template);
        
      // Update the name attributes with the new index
      $clone
        .find('[name="ingredient"]').attr('name', 'ingredient[' + ingredientIndex + '].ingredient').end()
        .find('[name="amount"]').attr('name', 'ingredient[' + ingredientIndex + '].amount').end()
        .find('[name="unit"]').attr('name', 'ingredient[' + ingredientIndex + '].unit').end()
  });
  
  // Add button for instructions
  $('.addInstructionButton').click(function() {
    console.log("In add instruction button");
    instructionIndex++;

    var $template = $('#instructionTemplate');

    var $clone = $template
                   .clone()
                   .removeClass('hide')
                   .removeAttr('id')
                   .attr('data-instruction-index', instructionIndex)
                   .insertBefore($template);

    $clone.find('[name="instruction"]').attr('name', 'instruction[' + instructionIndex + '].instruction');
  });
  
  // When the remove button gets clicked remove the corresponding row
  $('#ingredientsForm').on('click', '.removeIngredientButton', function() {
    console.log("In remove ingredient button");
    $(this).parent().parent().remove();
  });
});
