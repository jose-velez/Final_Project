'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Vitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heartRate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      bloodGlucose: {
        type: Sequelize.INTEGER,
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
      systolic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Vitals');
  }
};
