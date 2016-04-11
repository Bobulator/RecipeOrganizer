$(document).ready(function() {
  $('#searchForm').on('click', '#searchButton', function() {
    var query = $('#searchForm').serialize();
    $.ajax({url: "?" + query, success: function(result) {
      console.log(result);
    }});
  });
});
