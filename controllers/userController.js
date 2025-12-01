// controllers/userController.js
const { User, StudentProfile, TutorProfile } = require('../models');

const getMe = async (req, res) => {
  try {
    // req.user lấy từ middleware isAuthenticated ở trên
    const userId = req.user.userId; 
    const role = req.user.role; 

    console.log(`🔍 Đang lấy thông tin cho User ID: ${userId}, Role: ${role}`);

    // --- HARDCODED TEST USER DATA (Bypass DB) ---
    if (userId === 'student_test_id') {
        return res.json({
            success: true,
            data: {
                user_id: 'student_test_id',
                username: 'student_test',
                full_name: 'Test Student (Local)',
                email: 'student@test.local',
                phone_num: '0123456789',
                studentProfile: { grade_level: 12, school: 'High School Test' }
            }
        });
    }
    if (userId === 'tutor_test_id') {
        return res.json({
            success: true,
            data: {
                user_id: 'tutor_test_id',
                username: 'tutor_test',
                full_name: 'Test Tutor (Local)',
                email: 'tutor@test.local',
                phone_num: '0987654321',
                tutorProfile: { bio: 'I am a test tutor.', hourly_rate: 200000 }
            }
        });
    }
    // --------------------------------------------

    let includeOption = [];
    
    // Nếu là student thì lấy kèm StudentProfile, tutor thì lấy TutorProfile
    if (role === 'student') {
      includeOption = [{ model: StudentProfile, as: 'studentProfile' }];
    } else if (role === 'tutor') {
      includeOption = [{ model: TutorProfile, as: 'tutorProfile' }];
    }

    const user = await User.findOne({
      where: { user_id: userId },
      include: includeOption,
      attributes: { exclude: ['hashed_password'] } // Không bao giờ trả về mật khẩu!
    });

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại.' });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Lỗi getMe:', error);
    res.status(500).json({ message: 'Lỗi server.' });
  }
};

module.exports = { getMe };