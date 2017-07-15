'use strict';
module.exports = function(sequelize, DataTypes) {
  var Medicines = sequelize.define('Medicines', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT
    },
  }, {
    classMethods: {
      associate: function(models) {
        Medicines.belongsTo(models.Users, {
          foreignKey: 'userId',
          allowNull: true
        });
      }
    }
  });
  return Medicines;
};
