'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Table name is exactly 'editions' (lowercase) to match your model
    await queryInterface.createTable('editions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weeklyPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      monthlyPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yearlyPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), 
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), 
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('editions');
  }
};