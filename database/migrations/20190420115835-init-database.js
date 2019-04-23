'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_name: { type: STRING(32), allowNull: false },
      password: { type: STRING(256), allowNull: false },
      country_code: { type: STRING(8) },
      mobile: { type: STRING(32) },
      email: { type: STRING(255) },
      avatar_url: { type: STRING(255) },
      created_at: { type: DATE, defaultValue: new Date() },
      updated_at: { type: DATE, defaultValue: new Date() },
      is_vefily_email: { type: INTEGER, defaultValue: 0 },
      is_delete: { type: INTEGER, defaultValue: 0 },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
