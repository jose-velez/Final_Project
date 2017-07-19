'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vitals = sequelize.define('Vitals', {
    heartRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    bloodGlucose: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    systolic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    diastolic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    bodyTemp: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });
  Vitals.associate = function(models){
    Vitals.belongsTo(models.Users,{
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Vitals;
};
