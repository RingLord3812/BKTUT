// models/Subject.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subject = sequelize.define('Subject', {
  subject_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject_code: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  tableName: 'subjects',
  timestamps: false
});

module.exports = Subject;