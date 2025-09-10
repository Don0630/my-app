import { Menu, Sun, Moon } from "lucide-react";

export default function Navbar({
  setSidebarOpen,
  collapsed,
  setCollapsed,
  darkMode,
  setDarkMode,
}) {
  const buttonClasses =
    "p-2 bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none active:outline-none focus:ring-2 focus:ring-white cursor-pointer";

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Sidebar toggle (works on both desktop & mobile) */}
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

        <h2 className="text-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer">
          Home
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <a
          onClick={() => setDarkMode(!darkMode)}
          className={buttonClasses}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </a>
      </div>
    </div>
  );
}
