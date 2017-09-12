module.exports = function(sequelize, DataTypes){
  var Posts = sequelize.define("Posts", {
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },

    longitude: {
      type: DataTypes.FLOAT(1, 20),
      allowNull: false
    },

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
