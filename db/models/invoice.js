'use strict';
const { Model } = require('sequelize');

exports.MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init(
    {
      charge_date: { type: DataTypes.DATE, primaryKey: true },
      charge_title: { type: DataTypes.TEXT, primaryKey: true },
      amount: DataTypes.FLOAT,
      unit: { type: DataTypes.STRING(100), primaryKey: true }
    },
    {
      sequelize,
      modelName: 'invoice',
      tableName: 'invoice',
      underscored: true
    }
  );
  return invoice;
};
