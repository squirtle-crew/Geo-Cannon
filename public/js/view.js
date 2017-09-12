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

      if(data.username === userName && data.password === password){

        $.post("/app");
        // getPost();
      }
      else{

        $("#username").val("invalid information");
        $("#password").val("");
      }
    });
  }
  //
  // function newPost(){
  //   var newPost = {
  //     post: $("#newpost").val().trim(),
  //     longitude:
  //     latitude
  //   }
  //
  //   $.post("/api/post", newPost);
  //   getPost();
  //   $("#newpost").val("");
  // }
  //
  // function getPost(){
  //   var id = $(this).data("id");
  //
  //   $.get("/api/posts/" + id, function(data){
  //     console.log(data);
  //     for(i = 0, i < data.length; i++){
  //       var newDiv = $("<div>");
  //       newDiv.append(data.post);
  //
  //       $("#postsSection").html(newDiv);
  //     }
  //   });
  // }

  $(document).on("click", ".signUp", signUp);
  $(document).on("click", ".signIn", signIn);
  // $(document).on("click", ".newPost", newPost);

});
