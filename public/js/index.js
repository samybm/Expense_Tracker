$(document).ready(function() {
  console.log(moment().format("YYYY-MM-DD"));
  $("#date").val(moment().format("YYYY-MM-DD"));

  $("#add-expense").on("submit", function(event) {
    event.preventDefault();
    //get all input fields//
    var newExpense = {
      description: $("#description").val().trim(),
      amount: $("#amount").val(),
      date: $("#date").val(),
      CategoryId: $("#category").val(),
      UserId: 1
    };

    $.ajax("/api/expenses", {
      type: "POST",
      data: newExpense
    }).then(function(){
      location.reload();
    })



  })


});


