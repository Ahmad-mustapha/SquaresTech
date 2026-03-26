import React from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  activeUser: { fullName: string } | null;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeUser,
  setIsMobileMenuOpen,
}) => {
  const name = activeUser?.fullName || 'Admin';
  const firstName = name.split(' ')[0];

  return (
    <header className="bg-white border-b border-gray-100 w-full flex-shrink-0">
      <div className="px-5 lg:px-8 h-16 flex items-center justify-between gap-4 w-full">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden !bg-transparent !border-none !p-1.5 !rounded-md text-gray-500 hover:text-gray-700 !outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ fontSize: 'inherit' }}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Welcome text */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-bold text-gray-800 truncate leading-tight" style={{ margin: 0 }}>
            Welcome back, {firstName}!
          </h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* User avatar + name */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-violet-100 border-2 border-violet-200 flex items-center justify-center group-hover:border-violet-400 transition-colors overflow-hidden">
              <User className="w-4 h-4 text-violet-600" />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[12px] font-semibold text-gray-700 leading-none" style={{ margin: 0 }}>
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
