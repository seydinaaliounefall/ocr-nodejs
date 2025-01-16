// models/Invoice.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  vendorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Invoice;
