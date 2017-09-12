var path = require("path");

module.exports = function(app){


  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.post("/app", function(req, res){
    console.log("this works");
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

  app.get("/app", function(req, res){
    res.redirect("/");
  });

}
