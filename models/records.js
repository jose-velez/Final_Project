'use strict';
module.exports = function(sequelize, DataTypes) {
    var Records = sequelize.define('Records', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false
        },
        gender: {
          type: DataTypes.STRING,
          allowNull:false
        }},{
          classMethods: {
            associate: function(models) {
              Records.belongsTo(models.Users, {
                foreignKey: 'userId',
                allowNull: true
              });
            }
          }
        });
      return Records;
    };
