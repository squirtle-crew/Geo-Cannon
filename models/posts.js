module.exports = function(sequelize, DataTypes){
  var Posts = sequelize.define("Posts", {
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
<<<<<<< HEAD
=======

>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
    longitude: {
      type: DataTypes.FLOAT(1, 20),
      allowNull: false
    },
<<<<<<< HEAD
=======

>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
    latitude: {
      type: DataTypes.FLOAT(1, 20),
      allowNull: false
  }
});

Posts.associate = function(models){

  Posts.belongsTo(models.Users, {
    foreignKey: {
      allowNull: false
    }
  });
};

return Posts;
};
