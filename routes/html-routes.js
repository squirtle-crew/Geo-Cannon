var path = require("path");

module.exports = function(app){


  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/app", function(req, res){
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });


}
