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
        gender: {
          type: DataTypes.STRING,
          allowNull: false
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false
        },
        contactName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contactNumber: {
          type: DataTypes.STRING,
          allowNull: false
        },
        relation: {
          type: DataTypes.STRING,
          allowNull: false
        },
        medicalConditions: {
          type: DataTypes.STRING,
          allowNull: true
        }
      });

    Records.associate = function(models) {
      Records.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };

      return Records;
    };
