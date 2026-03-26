import React from 'react';
import {
  LayoutGrid,
  ShoppingBag,

  LogOut,
  X,
  Users,
  Briefcase,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const activePath = location.pathname;

  const menuItems = [
    { title: 'Dashboard', path: '/', icon: LayoutGrid },
    { title: 'Team Members', path: '/members', icon: Users },
    { title: 'Task Board', path: '/tasks', icon: Briefcase },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-white border-r border-gray-100 transform lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="px-6 h-16 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
            >
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-gray-800 tracking-tight text-[15px]">
              SQUARESTECH
            </span>
          </div>
          <button
            className="lg:hidden !bg-transparent !border-none !p-1 !rounded-md text-gray-400 hover:text-gray-600 !outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ fontSize: 'inherit' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium no-underline transition-colors duration-150 ${isActive
                  ? 'bg-violet-50 text-violet-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-violet-600' : 'text-gray-400'}`} />
                <span>{item.title}</span>
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-violet-600 rounded-l-sm"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="flex-shrink-0 pb-6">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-6 py-2.5 w-full text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:!bg-gray-50 !bg-transparent !border-none !rounded-none !outline-none transition-colors"
            style={{ fontSize: '13px', padding: '10px 24px' }}
          >
            <LogOut className="w-[18px] h-[18px] text-gray-400" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
