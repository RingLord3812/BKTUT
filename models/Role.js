const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define('Role', {
  role_id: { type: DataTypes.INTEGER, primaryKey: true },
  role_name: { type: DataTypes.STRING }
}, { tableName: 'roles', timestamps: false });

module.exports = Role;