import React from 'react';
import { Menu, Search, Notifications, ChatBubbleOutline } from '@mui/icons-material';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Left: Menu Icon */}
      <button className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Menu />
      </button>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border-none rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all shadow-sm"
            placeholder="Tìm kiếm khóa học, tutor..."
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all relative">
          <Notifications fontSize="small" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ChatBubbleOutline fontSize="small" />
        </button>
      </div>
    </header>
  );
};

export default Header;
