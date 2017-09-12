module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("Users", {
<<<<<<< HEAD
=======
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
<<<<<<< HEAD
        len[1, 12]
=======
        len: [1, 12]
>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
<<<<<<< HEAD
        len[1, 12]
=======
        len: [1, 12]
>>>>>>> 67c6d92ea2c0b5bc8456d16a3c86f5eae58b8dea
      }
    }
  });

  Users.associate = function(models){

    Users.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };

  return Users;
};
