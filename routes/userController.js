// controllers/userController.js
const { User, StudentProfile, TutorProfile } = require('../models');

const getMe = async (req, res) => {
  try {
    // req.user lấy từ middleware isAuthenticated ở trên
    const userId = req.user.userId; 
    const role = req.user.role; 

    console.log(`🔍 Đang lấy thông tin cho User ID: ${userId}, Role: ${role}`);

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