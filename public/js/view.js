
//----------------functions for sign in and sign up on home page-----------------//

$(document).ready(function(){

  function signUp(){
    var newUser = {
      name: $("#newName").val().trim(),
      username: $("#newUsername").val().trim(),
      password: $("#newPassword").val().trim()
    }
    var userName = $("#newUsername").val().trim();

    $.get("/api/users/" + userName, function(data){
      console.log(data);

        if(data){
          $("#newUsername").val("username exists!");
          $("#newName").val("");
          $("#newPassword").val("");
        }
        else if(!data){
          $.post("/api/signup", newUser);
          $("#newName").val("");
          $("#newUsername").val("");
          $("#newPassword").val("");
        }

    });
  }

  function signIn(){
    var userName = $("#username").val().trim();
    var password = $("#password").val().trim();

    $.get("/api/signin/" + userName, function(data){
      console.log(data);
      console.log(userName);
      console.log(password);
      if(data.username === userName && data.password === password){

        window.location.href = "/app#" + data.username;
      }
      else{

        $("#username").val("invalid information");
        $("#password").val("");
      }
    });
  }

  $(document).on("click", ".signUp", signUp);
  $(document).on("click", ".signIn", signIn);


});
