import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart2,
  Map,
  Users,
  Bus,
  Droplet,
  Zap,
  Building,
  Briefcase,
  Shield,
} from "lucide-react";

import logo from "../assets/logo.png"; // ✅ replace with your own logo

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/" },
  { name: "Business Analytics", icon: <BarChart2 size={20} />, path: "/analytics" },
  { name: "Business Locator Maps", icon: <Map size={20} />, path: "/maps" },
  { name: "Human Resources", icon: <Users size={20} />, path: "/human" },
  { name: "Transportation", icon: <Bus size={20} />, path: "/transport" },
  { name: "Water", icon: <Droplet size={20} />, path: "/water" },
  { name: "Power", icon: <Zap size={20} />, path: "/electricity" },
  { name: "Residential", icon: <Building size={20} />, path: "/residential" },
  { name: "Business", icon: <Briefcase size={20} />, path: "/business" },
  { name: "Crime", icon: <Shield size={20} />, path: "/crime" },
];

export default function Sidebar({ collapsed, mobile = false }) {
  return (
    <div
      className={`${mobile ? "flex" : "hidden md:flex"} flex-col h-full 
      bg-white dark:bg-gray-900 transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} flex-shrink-0 relative z-40`}
      style={{
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.15)", // ✅ right-side shadow only
      }}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "gap-2"
        } px-4 py-2 border-b dark:border-gray-700`}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-9 h-9 object-contain rounded-full"
          style={{ boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)" }}
        />
        {!collapsed && (
          <h1 className="text-lg font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
            Business Locator
          </h1>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded transition text-sm ${
                collapsed ? "justify-center p-3" : "gap-3 p-2"
              } ${
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-800"
              }`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
