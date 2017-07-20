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
  $("#loginBtn").click(function() {
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
      success: function(res) {
        var token = res.token;
        console.log(token);
        localStorage.setItem('token', token);
        console.log("User log-in");
        location.href = "/record";
      },
    });
  });

  //=========================================
  //             Create Record
  //=========================================
  $("#recordButton").click(function() {
    var recordName = $("#recordName").val().trim();
    var dateOfBirth = $("#recordDob").val().trim();
    var contactName = $("#contactName").val().trim();
    var contactNumber = $("#contactNumber").val().trim();
    var relation = $("#relation").val().trim();
    var medicalConditions = $("#medicalConditions input:checked").map(function() {
      return this.name;
    }).get();

    var medicalString = JSON.stringify(medicalConditions);
    console.log(medicalString);

    var recordObj = {
      recordName: recordName,
      dateOfBirth: dateOfBirth,
      contactName: contactName,
      contactNumber: contactNumber,
      relation: relation,
      medicalConditions: medicalString
    };
    console.log(recordObj);

    $.ajax({
      type: 'post',
      url: '/api/record',
      data: recordObj,
      success: function(res) {
        console.log("success: " + res);
        window.location.href = '/record';
      },
      error: function(error) {
        console.log(error);
        location.href = '/record';
      }
    });

  });
  //==================================
  //             Vitals
  //==================================
  $("#vitalBtn").click(function() {
    var heartRate = $("#heartInput").val().trim();
    var bloodGlucose = $("#glucoseInput").val().trim();
    var weight = $("#weightInput").val().trim();
    var systolic = $("#systolicInput").val().trim();
    var diastolic = $("#diastolicInput").val().trim();
    var bodyTemp = $("#tempInput").val().trim();

    var vitalsObj = {
      heartRate: heartRate,
      bloodGlucose: bloodGlucose,
      weight: weight,
      systolic: systolic,
      diastolic: diastolic,
      bodyTemp: bodyTemp
    };

    console.log(vitalsObj);


  $.ajax({
    type: 'post',
    url: '/api/vitals',
    data: vitalsObj,
    success: function(res) {
      console.log("Vitals Success" + res);
      location.href = 'record';
    },
    error: function(error){
      console.log(error);
      location.href= '/vitals';
    }
  });
  });
});
