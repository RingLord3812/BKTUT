import React from 'react';
import { Home, Person, School, CalendarToday, Settings, Book } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <Home />, label: 'Trang Chủ', path: '/' },
    { icon: <Person />, label: 'Thông Tin Sinh Viên', path: '/profile' },
    { icon: <School />, label: 'Khóa Học Của Tôi', path: '/my-courses' },
    { icon: <CalendarToday />, label: 'Lịch học', path: '/schedule' },
    { icon: <Settings />, label: 'Cài Đặt', path: '/settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-blue-700 text-white flex flex-col shadow-xl z-20">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-blue-600/30">
        <Book fontSize="large" className="text-white" />
        <span className="text-2xl font-bold tracking-wide">BK Tutor</span>
      </div>

      {/* User Profile Summary */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white/20 flex items-center justify-center text-blue-800 font-bold text-2xl mb-3 shadow-md">
          NQ
        </div>
        <div className="text-center">
          <div className="font-bold text-lg">TTT</div>
          <div className="text-sm text-blue-200 bg-blue-800/50 px-3 py-0.5 rounded-full mt-1 inline-block">36</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-white text-blue-700 shadow-md font-semibold translate-x-1'
                  : 'hover:bg-blue-600 text-blue-100 hover:text-white hover:translate-x-1'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-6 border-t border-blue-600/30 bg-blue-800/20">
        <div className="text-sm font-medium text-blue-100">Sinh viên</div>
        <div className="text-xs text-blue-300 mt-1">{new Date().toLocaleDateString('vi-VN')}</div>
      </div>
    </div>
  );
};

export default Sidebar;
