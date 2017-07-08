'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Medicines', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      info: {
        type: Sequelize.TEXT,
        allowNull: false
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
    return queryInterface.dropTable('Medicines');
  }
};
