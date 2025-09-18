import { Link } from "react-router-dom";
import { Menu, Sun, Moon, Maximize, User } from "lucide-react";

export default function Navbar({
  setSidebarOpen,
  collapsed,
  setCollapsed,
  darkMode,
  setDarkMode,
}) {
  const buttonClasses =
    "p-2 bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none active:outline-none focus:ring-2 focus:ring-white cursor-pointer";

  // ✅ Fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Sidebar toggle */}
        <a
          onClick={() => {
            if (window.innerWidth < 768) {
              setSidebarOpen(true); // Mobile
            } else {
              setCollapsed(!collapsed); // Desktop
            }
          }}
          className={buttonClasses}
        >
          <Menu size={18} />
        </a>

 
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Fullscreen */}
        <a onClick={toggleFullScreen} className={buttonClasses}>
          <Maximize size={20} />
        </a>

        {/* Dark Mode Toggle */}
        <a onClick={() => setDarkMode(!darkMode)} className={buttonClasses}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </a>

        {/* Profile */}
        <a className={buttonClasses}>
          <User size={20} />
        </a>
      </div>
    </div>
  );
}
