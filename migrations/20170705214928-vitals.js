'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Vitals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      heartRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      bloodGlucose: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Blood Pressure upper number
      systolic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // Blood Pressure lower number
      diastolic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      bodyTemp: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Vitals');
  }
};
