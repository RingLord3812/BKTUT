// models/index.js
const { sequelize } = require('../config/database');
const Role = require('./Role');

// 1. Import Models
const User = require('./User');
const StudentProfile = require('./StudentProfile');
const TutorProfile = require('./TutorProfile');
const Subject = require('./Subject');
const TutorSlot = require('./TutorSlot');
const Booking = require('./Booking');

// 2. Define Relationships (Quan hệ)

// User --- Profiles
User.hasOne(StudentProfile, { foreignKey: 'user_id', as: 'studentProfile' });
StudentProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(TutorProfile, { foreignKey: 'user_id', as: 'tutorProfile' });
TutorProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// TutorSlot Relationships
TutorSlot.belongsTo(TutorProfile, { foreignKey: 'tutor_user_id', targetKey: 'user_id', as: 'tutor' });
TutorSlot.belongsTo(Subject, { foreignKey: 'subject_id', as: 'subject' });

// Booking Relationships
Booking.belongsTo(User, { foreignKey: 'student_user_id', as: 'student' });
Booking.belongsTo(TutorSlot, { foreignKey: 'tutor_slot_id', as: 'slot' });
User.belongsToMany(Role, { through: 'user_roles', foreignKey: 'user_id', otherKey: 'role_id', as: 'roles' });
Role.belongsToMany(User, { through: 'user_roles', foreignKey: 'role_id', otherKey: 'user_id', as: 'users' });

// 3. Export
module.exports = {
  sequelize,
  User,
  StudentProfile,
  TutorProfile,
  Subject,
  TutorSlot,
  Booking,
  Role
};