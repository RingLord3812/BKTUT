const { User } = require('./models');
const { sequelize } = require('./config/database');
const bcrypt = require('bcryptjs');

const createTestUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');

    const password = 'password123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Student User
    const studentUsername = 'student_test';
    const existingStudent = await User.findOne({ where: { username: studentUsername } });
    
    if (!existingStudent) {
      await User.create({
        user_id: 'student_' + Date.now(),
        username: studentUsername,
        full_name: 'Test Student',
        email: 'student_test@example.com',
        hashed_password: hashedPassword,
        phone_num: '0123456789'
      });
      console.log(`Created user: ${studentUsername} / ${password}`);
    } else {
      console.log(`User ${studentUsername} already exists. Password might be different.`);
    }

    // Create Tutor User
    const tutorUsername = 'tutor_test';
    const existingTutor = await User.findOne({ where: { username: tutorUsername } });

    if (!existingTutor) {
      await User.create({
        user_id: 'tutor_' + Date.now(),
        username: tutorUsername,
        full_name: 'Test Tutor',
        email: 'tutor_test@example.com',
        hashed_password: hashedPassword,
        phone_num: '0987654321'
      });
      console.log(`Created user: ${tutorUsername} / ${password}`);
    } else {
      console.log(`User ${tutorUsername} already exists.`);
    }

  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await sequelize.close();
  }
};

createTestUser();
