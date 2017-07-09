$(document).ready(function() {
  $("#createUser").click(function() {
    var regFirstName = $('#reg-firstName').val().trim();
    var regLastName = $('#reg-lastName').val().trim();
    var regEmail = $('#reg-email').val().trim();
    var regPassword = $('#reg-password').val().trim();
    var regConfirmPass = $('#reg-confirmPassword').val().trim();
    if (regPassword != regConfirmPass) {
      console.log("Sorry Password didn't match");
      $('#regErrMsg').html("<h4 class='text-center' style='color:#346de9;'>Sorry, your passwords don't match. Please try again.</h4>");
      var userObj = {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword
      };
    } else {

      console.log(userObj);
    }

  });

});
