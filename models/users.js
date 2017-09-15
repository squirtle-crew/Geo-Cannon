module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("Users", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 12]
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 12]
      }
    },

    NewestPost: {
      type: DataTypes.STRING,
      validate:{
        len: [1, 140]
      }
    },

    longitude: {
      type: DataTypes.DECIMAL(10, 7),
    },

    latitude: {
      type: DataTypes.DECIMAL(20, 7),
  }
  });

  Users.associate = function(models){

    Users.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };

  return Users;
};
