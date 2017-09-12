$(document).ready(function(){

$(document).on("click", ".signUp", signUp);
$(document).on("click", ".signIn", signIn);
$(document).on("click", ".newPost", newPost);

  function signUp(){
    var newUser = {
      name: $("#newName").val().trim(),
      username: $("#newUsername").val().trim(),
      password: $("#newPassword").val().trim()
    }
    $.get("/api/users", function(data){
      console.log(data);
      for(i = 0; i < data.length, i++){
        if(data[i].username === $("#newUsername").val().trim()){
          alert("username already exsists!");
        }
      }
    });
    $.post("/api/signup", newUser);
    $("#newName").val("");
    $("#newUsername").val("");
    $("#newPassword").val("");
  }

  function signIn(){
    $.get("/api/signin", function(data){
      console.log(data);

      if(data.username === $("#username").val().trim() && data.password === $("password").val().trim()){

        window.location.href = "/app";
        getPost();
      }
      else{

        alert("cannot sign in, information incorrect!");

      }
    });
  }

  function newPost(){
    var newPost = {
      post: $("#newpost").val().trim(),
      longitude:,
      latitude
    }

    $.post("/api/post", newPost);
    getPost();
    $("#newpost").val("");
  }

  function getPost(){
    var id = $(this).data("id");
    var newDiv = $("<div>");
    $.get("/api/posts/" + id, function(data){
      console.log(data);
      for(i = 0, i < data.length; i++){
        var newDiv = $("<div>");
        newDiv.append(data.post);

        $("#postsSection").append(newDiv);
      }
    });
  }



});
