// client/src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentHomePage from './pages/StudentHomePage';
import TutorHomePage from './pages/TutorHomePage'; // <--- 1. Import file mới
import MainLayout from './components/MainLayout';

// --- Icons (SVG) ---
const LogoIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const BellIcon = () => (
  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
const ChatIcon = () => (
  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
);

// --- Components ---

const Sidebar = () => {
  const menuItems = [
    { icon: <HomeIcon />, label: "Trang Chủ", active: true },
    { icon: <BookIcon />, label: "Khóa Học", active: false },
    { icon: <CalendarIcon />, label: "Lịch Học", active: false },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-blue-700 flex flex-col text-white z-50">
      {/* Part 1: Logo */}
      <div className="p-6 flex items-center gap-3">
        <LogoIcon />
        <span className="text-xl font-bold">BK Tutor</span>
      </div>

      {/* Part 2: User Profile */}
      <div className="px-4 mb-6">
        <div className="bg-blue-800/50 rounded-xl p-4 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2 border-2 border-blue-400">
            <span className="text-sm font-bold text-white">NQ</span>
          </div>
          <h3 className="font-bold text-lg">TTT</h3>
          <p className="text-sm opacity-80">ID: 36</p>
        </div>
      </div>

      {/* Part 3: Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 ${
              item.active
                ? "bg-white text-blue-700 rounded-lg font-semibold shadow-md"
                : "text-white hover:bg-white/10 rounded-lg"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Part 4: Footer */}
      <div className="absolute bottom-4 left-0 w-full text-center opacity-70 text-xs">
        <p>Sinh viên</p>
        <p>Thứ Sáu, Ngày 24/8/2023</p>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex justify-between items-center px-8">
      {/* Left: Hamburger */}
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MenuIcon />
      </button>

      {/* Center: Search Bar */}
      <div className="relative w-[400px] lg:w-[500px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition-all"
          placeholder="Tìm kiếm khóa học, tutor..."
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <BellIcon />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChatIcon />
        </button>
      </div>
    </header>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 p-5 h-[200px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
      {/* Layer 1: Top Badges */}
      <div className="flex justify-between items-start">
        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {course.subject}
        </span>
        <span className="border border-white/30 text-white px-3 py-1 rounded-full text-xs">
          {course.capacity}
        </span>
      </div>

      {/* Layer 2: Info Center */}
      <div>
        <h3 className="text-white font-bold text-xl mb-1">{course.title}</h3>
        <div className="space-y-0.5">
          <p className="text-white text-sm opacity-90">Tutor: {course.tutor}</p>
          <p className="text-white text-sm opacity-90">Sinh viên: {course.students}</p>
        </div>
      </div>

      {/* Layer 3: Footer Action */}
      <div className="flex justify-between items-end">
        <span className="text-blue-100 text-xs">Cập nhật mới nhất</span>
        <button className="bg-white text-blue-700 font-semibold text-sm rounded-lg px-4 py-2 hover:scale-105 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm">
          Đăng ký
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const courses = [
    { id: 1, subject: "CNPM", capacity: "45 sv", title: "Công nghệ Phần mềm", tutor: "Nguyễn Văn A", students: 120 },
    { id: 2, subject: "MMT", capacity: "30 sv", title: "Mạng Máy Tính", tutor: "Trần Thị B", students: 85 },
    { id: 3, subject: "CSDL", capacity: "50 sv", title: "Cơ Sở Dữ Liệu", tutor: "Lê Văn C", students: 150 },
    { id: 4, subject: "CTDL", capacity: "40 sv", title: "Cấu Trúc Dữ Liệu", tutor: "Phạm Thị D", students: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      
      {/* Main Container */}
      <div className="ml-64 min-h-screen flex flex-col">
        <Header />
        
        {/* Content Body */}
        <main className="flex-1 p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Khóa học có thể đăng ký</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}