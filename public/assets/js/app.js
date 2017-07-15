$(document).ready(function() {
  $("#createUser").click(function() {
    // Getting all the input from the user and storing them in variables.
    var regFirstName = $('#reg-firstName').val().trim();
    var regLastName = $('#reg-lastName').val().trim();
    var regEmail = $('#reg-email').val().trim();
    var regPassword = $('#reg-password').val().trim();
    var regConfirmPass = $('#reg-confirmPassword').val().trim();
    // Making a user Object to send it in the AJAX call.
    var userObj = {
      firstName: regFirstName,
      lastName: regLastName,
      email: regEmail,
      password: regPassword
    };
    // Verifying that the passwords match.
    if (regPassword != regConfirmPass) {
      console.log("Sorry Password didn't match");
      // I they don't match it will send the message to the user, so they can change the password.
      $('#regErrMsg').html("<h4 class='text-center' style='color:#346de9;'>Sorry, your passwords don't match. Please try again.</h4>");
    } else {
      // If the passwords match is going to make the ajax call so we can save the new user to the database.
      $.ajax({
        type: 'Post',
        url: '/signup',
        data: userObj,
        success: function(result) {
          console.log(result);

          $('#registerForm')[0].reset();

          //debugger;
          location.href = "/record";
        }
      });
    }

  });

  //==================================
  //        Login
  //==================================
  $("#loginBtn").click(function(){
    var logEmail = $("#login-email").val().trim();
    var logPass = $("#login-password").val().trim();

    var loginObj = {
      email: logEmail,
      password: logPass
    };

    $.ajax({
        type: 'post',
        url: '/login',
        data: loginObj,
        success: function (res) {
          var token = res.token;
          console.log(token);
          localStorage.setItem('token', token);
          console.log("User log-in");
          location.href = "/record";
        },
  });
});

//=========================================
//              Record
//=========================================

});
