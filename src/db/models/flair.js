'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define('Flair', {
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
     type: DataTypes.STRING,
     allowNull: false
   },
   postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Flair.associate = function(models) {
    Flair.belongsTo(models.Post, {
       foreignKey: "postId",
       as: "flairs",
       onDelete: "CASCADE"
     });
  };
  return Flair;
};
