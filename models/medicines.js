'use strict';
module.exports = function(sequelize, DataTypes) {
  var Medicines = sequelize.define('Medicines', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT
    }
  });

    Medicines.associate = function(models){
      Medicines.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  return Medicines;
};
