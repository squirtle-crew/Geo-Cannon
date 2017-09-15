var db = require("../models");

module.exports = function(app){

  app.get("/api/users/:username", function(req, res){

    db.Users.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(results){
      res.json(results);
    });
  });

  app.get("/api/signin/:username", function(req, res){

    db.Users.findOne({
      where: {
        username: req.params.username
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
    }).then(function(){
      res.redirect("/");
  });
  });

  app.get("/api/posts/:id", function(req, res){

    db.Posts.findAll({
      limit: 5,
      order: [['updatedAt', 'DESC']],
      where: {
        UserId: req.params.id
      }
    }).then(function(dbPosts){
      res.json(dbPosts);
    });
  });

  app.post("/api/post", function(req, res){

    db.Posts.create({
      post: req.body.post,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      UserId: req.body.UserId
    }).then(function(dbPost){
      res.json(dbPost);
    });
  });

  app.put("/api/newpost/:id", function(req, res){

    db.Users.update({
      NewestPost: req.body.post,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
      {
        where: {
          id: req.params.id
        }

    }).then(function(newpost){
      res.json(newpost);
    });
  });

  app.get("/api/allpost/:username", function(req, res){

    db.Users.findAll({
      where: {
        username: {$notIn: [req.params.username]}
      }

    }).then(function(results){
      res.json(results);
    });
  });

}
