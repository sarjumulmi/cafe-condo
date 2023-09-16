"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
    const migrationUtil = require("../util/migrationUtil");

    await sequelize.transaction(async (transaction) => {
      await migrationUtil.execSqlFile(sequelize, __filename, { transaction });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invoices");
  },
};
