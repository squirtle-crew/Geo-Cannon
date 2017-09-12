var db = require("../models");

module.exports = function(app){

<<<<<<< HEAD
=======
  app.get("/api/signin", function(req, res){
    db.Users.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(results){
      res.json(results);
    });
  });

  app.post("/api/signup", function(req, res){
    db.Users.create({
      name: req.body.name,
      username: req.body.username,
      password:req.body.password
    });
  }).then(function(){
    res.redirect("/");
  });

>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
  app.get("/api/posts/:id", function(req, res){

    db.Posts.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbPosts){
      res.json(dbPosts);
    });
  });

  app.post("/api/post". function(req, res){

    db.Posts.create({
      post: req.body.post,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });



}
