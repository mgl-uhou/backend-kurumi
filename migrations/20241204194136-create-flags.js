'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Adiciona o campo de auto incremento
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Se precisar reverter a migração, apagamos a tabela 'Flags'
    await queryInterface.dropTable('Flags');
  }
};
