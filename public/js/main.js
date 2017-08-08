// register clicklistener for edit
$(".edit-domain").on("click", function() {
  console.log($(this).parent().text);
});

// register clicklistener for delete
$(".delete-domain").on("click", function() {
  // find the .domain cell in the table row
  var domainName = $(this).closest("tr").children(".domain").text();
  // show modal message
  showModalMessage("test", () => {

  });
  // DELETE to /domains/:domain
  $.ajax({
    url: '/domains/' + domainName,
    type: 'DELETE',
    success: function(result) {
      location.reload();
    }
  });
});

$('.delete-user').on('click', function() {
  var userEmail = $(this).closest('tr').children('.userEmail').text();

  // delete to /users/:user
  $.ajax({
    url: '/users/' + userEmail,
    type: 'DELETE',
    success: function(result) {
      location.reload();
    }
  });
});

var showModalMessage = function(message, callback) {
  // TODO
}
