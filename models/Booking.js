// models/Booking.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tutor_slot_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Scheduled', 'Completed', 'Cancelled'),
    defaultValue: 'Scheduled'
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Booking;