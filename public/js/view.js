//----------------functions for sign in and sign up on home page-----------------//

$(document).ready(function() {

    function signUp() {
        var newUser = {
            name: $("#newName").val().trim(),
            username: $("#newUsername").val().trim(),
            password: $("#newPassword").val().trim()
        }
        var userName = $("#newUsername").val().trim();

        $.get("/api/users/" + userName, function(data) {
            console.log(data);

            if (data || $("#newPassword").val() !== $("#confirmPassword").val()) {
              $("#successmessage").html("<div class='alert alert-danger fade in'>" +
                "<a href='#' class='close' data-dismiss='alert'>&times;</a>" +
                "<strong>'Error!'</strong> " + 'Either username exists or passwords do not match.' +
                "</div>");
                $("#newUsername").val("");
                $("#confirmPassword").val("");
                $("#newName").val("");
                $("#newPassword").val("");
            }

            else if (!data && $("#newPassword").val() === $("#confirmPassword").val()) {
                $.post("/api/signup", newUser);
                $("#successmessage").html("<div class='alert alert-success fade in'>" +
                  "<a href='#' class='close' data-dismiss='alert'>&times;</a>" +
                  "<strong>'Success!'</strong> " + 'Your account has been made successfully.' +
                  "</div>");
                $("#newName").val("");
                $("#newUsername").val("");
                $("#newPassword").val("");
                $("#confirmPassword").val("");
            }

        });
    }

    function emptyData(){
      if ($("#newName").val()=="" || $("#newUsername").val()=="" || $("#newPassword").val()=="" || $("#confirmPassword").val()=="") {

          $("#successmessage").html("<div class='alert alert-danger fade in'>" +
            "<a href='#' class='close' data-dismiss='alert'>&times;</a>" +
            "<strong>'Error!'</strong> " + 'Must fill out all forms.' +
            "</div>");
          $("#newName").val("");
          $("#newUsername").val("");
          $("#newPassword").val("");
          $("#confirmPassword").val("");
      }
    }

    function signIn() {
        var userName = $("#username").val().trim();
        var password = $("#password").val().trim();

        $.get("/api/signin/" + userName, function(data) {
            console.log(data);
            console.log(userName);
            console.log(password);
            if (data.username === userName && data.password === password) {

                window.location.href = "/app#" + data.username;
            } else {

                $("#username").val("invalid information");
                $("#password").val("");
            }
        });
    }

    $(document).on("click", ".signUp", function(){
      emptyData();
      signUp();
    });
    $(document).on("click", ".signIn", signIn);


});
