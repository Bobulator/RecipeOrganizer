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
        .find('[name="ingredient"]')
          .attr('name', 'ingredients_ingredient')
          .attr('disabled', false).end()
        .find('[name="amount"]')
          .attr('name', 'ingredients_amount')
          .attr('disabled', false).end()
        .find('[name="unit"]')
          .attr('name', 'ingredients_unit')
          .attr('disabled', false).end()
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
                   .removeAttr('disabled')
                   .attr('data-instruction-index', instructionIndex)
                   .insertBefore($template);

    $clone.find('[name="instruction"]')
      .attr('name', 'instructions_instruction')
      .attr('disabled', false).end();
  });
  
  // When the remove ingredient button gets clicked remove the corresponding ingredient
  $('#ingredientsForm').on('click', '.removeIngredientButton', function() {
    console.log('In remove ingredient button');
    $(this).parent().parent().remove();
  });

  // When the remove instruction button gets clicked, remove the correspnding instruction
  $('#instructionsForm').on('click', '.removeInstructionButton', function() {
    console.log('In remove Instruction button');
    $(this).parent().parent().remove();
  });
});
