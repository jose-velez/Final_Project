var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.Records, {
      onDelete: "cascade"
    });
  };

  return Users;
};
