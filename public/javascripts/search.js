$(document).ready(function() {
  $('#searchForm').on('click', '#searchButton', function() {
    var query = $('#searchForm').serialize();
    $.ajax({url: "?" + query, success: function(recipes) {
      console.log(recipes);
      
      // Clear the current recipe cells
      $('.recipeCells').empty();

      // Create new cells from the given recipes
      var $template = $('#cellTemplate');

      // Clone the tmplate for each given recipe
      for (i = 0; i < recipes.length; i++) {
        var $clone = $template
                       .clone()
                       .removeClass('hide')
                       .attr('_id', recipes[i]._id);
        $clone.find('h4.title').html(recipes[i].title);
        $clone.find('p.description').html(recipes[i].description);
        $clone.find('them').html(recipes[i].theme);
        $('.recipeCells').append($clone);
      }
    }});
  });
});
