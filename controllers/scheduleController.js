// controllers/scheduleController.js
const { sequelize, TutorSlot, Booking, User, Subject, TutorProfile } = require('../models');

// 1. Tutor tạo lịch rảnh (POST /slots)
const createSlot = async (req, res) => {
  try {
    const { subject_id, start_time, end_time } = req.body;
    const tutorId = req.user.userId; // Lấy từ token

    const newSlot = await TutorSlot.create({
      tutor_user_id: tutorId,
      subject_id,
      start_time, // Format: "2025-11-20 08:00:00"
      end_time,
      is_booked: false
    });

    res.json({ success: true, data: newSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo lịch.' });
  }
};

// 2. Student xem danh sách lịch rảnh (GET /slots)
const getAvailableSlots = async (req, res) => {
  try {
    const slots = await TutorSlot.findAll({
      where: { is_booked: false }, // Chỉ lấy lịch chưa đặt
      include: [
        { 
          model: TutorProfile, 
          as: 'tutor',
          include: [{ model: User, as: 'user', attributes: ['full_name'] }] // Lấy tên Tutor
        },
        { model: Subject, as: 'subject' } // Lấy tên môn học
      ]
    });

    res.json({ success: true, data: slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch.' });
  }
};

// 3. Student đặt lịch - DÙNG TRANSACTION (POST /bookings)
const bookSlot = async (req, res) => {
  // Bắt đầu Transaction (Giao dịch)
  const t = await sequelize.transaction();

  try {
    const { tutor_slot_id } = req.body;
    const studentId = req.user.userId;

    // Bước A: Tìm Slot và KHÓA nó lại (để người khác không tranh được lúc này)
    const slot = await TutorSlot.findOne({
      where: { slot_id: tutor_slot_id },
      lock: true, 
      transaction: t
    });

    if (!slot) {
      await t.rollback();
      return res.status(404).json({ message: 'Lịch không tồn tại.' });
    }

    // Bước B: Kiểm tra xem đã bị đặt chưa
    if (slot.is_booked) {
      await t.rollback();
      return res.status(400).json({ message: 'Lịch này vừa mới bị người khác đặt rồi!' });
    }

    // Bước C: Tạo Booking
    const newBooking = await Booking.create({
      student_user_id: studentId,
      tutor_slot_id: tutor_slot_id,
      status: 'Scheduled'
    }, { transaction: t });

    // Bước D: Cập nhật Slot thành đã đặt
    slot.is_booked = true;
    await slot.save({ transaction: t });

    // Bước E: Lưu thay đổi (Commit)
    await t.commit();

    res.json({ success: true, message: 'Đặt lịch thành công!', data: newBooking });

  } catch (error) {
    // Nếu có lỗi bất kỳ, hoàn tác mọi thứ (Rollback)
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Lỗi hệ thống khi đặt lịch.' });
  }
};

module.exports = { createSlot, getAvailableSlots, bookSlot };