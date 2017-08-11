// register clicklistener for delete
$('.btn-delete').on('click', function() {
  // find the .domain cell in the table row
  $(this).closest('tr').toggleClass('markedToDelete');
  // show modal message
  $('#deleteModal').modal('show');
});

// If in model delete is clicked the specific domain is deleted and the page reloaded.
$('.btn-delete-modal').on('click', function() {
  var markedToDeleteLine = $('.markedToDelete');
  var param = markedToDeleteLine.children('.main-value').text();
  var path = window.location.pathname + '/';
  //DELETE to /path/:param
  $.ajax({
    url: path + param,
    type: 'DELETE',
    success: function(result) {
      markedToDeleteLine.toggleClass('markedToDelete');
      $('#deleteModal').modal('hide');
      $('#deleteModal').on('hidden.bs.modal', function() {
        location.reload();
      });
    }
  });
});
