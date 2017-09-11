module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len[1, 12]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len[1, 12]
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
