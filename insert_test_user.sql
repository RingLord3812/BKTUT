-- Script để tạo user test
-- Mật khẩu cho cả 2 user là: 123456

-- Tạo user Student
INSERT INTO users (user_id, username, full_name, email, hashed_password, created_at, updated_at)
VALUES 
('student_test_01', 'student_test', 'Test Student', 'student_test@example.com', '$2b$10$1KM/vQ0G9XCCAbZNyDRw.uMAsZ424KEU5/VX6Ns4f9eUx0thfFIeG', NOW(), NOW());

-- Tạo user Tutor
INSERT INTO users (user_id, username, full_name, email, hashed_password, created_at, updated_at)
VALUES 
('tutor_test_01', 'tutor_test', 'Test Tutor', 'tutor_test@example.com', '$2b$10$1KM/vQ0G9XCCAbZNyDRw.uMAsZ424KEU5/VX6Ns4f9eUx0thfFIeG', NOW(), NOW());
