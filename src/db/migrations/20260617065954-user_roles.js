'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Part of the composite primary key
        allowNull: false,
        references: {
          model: 'roles', // Matches your lowercase plural roles table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // If a role is deleted, remove this relationship
      },
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Part of the composite primary key
        allowNull: false,
        references: {
          model: 'users', // Matches your lowercase plural users table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // If a user is deleted, remove this relationship
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_roles');
  }
};