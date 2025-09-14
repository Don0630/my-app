// pages/Analytics.jsx
import { useState } from "react";
import BusinessAnalytics from "./BusinessAnalytics";
import FloodAnalytics from "./FloodAnalytics";

// ✅ Lucide React Icons
import { Briefcase, Droplet } from "lucide-react";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("business");

  const tabs = [
    { id: "business", label: "Business Analytics", icon: <Briefcase size={16} className="text-cyan-500" />, component: <BusinessAnalytics /> },
    { id: "flood", label: "Flood Analytics", icon: <Droplet size={16} className="text-blue-500" />, component: <FloodAnalytics /> },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* 🔹 Tabs Header sits BELOW the Navbar */}
      <div className="sticky z-[1001] bg-gray-200 dark:bg-gray-700 flex overflow-x-auto no-scrollbar shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              role="tab"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-t-lg transition-all border cursor-pointer select-none ${
                isActive
                  ? "bg-white dark:bg-gray-900 border-gray-300 border-b-0 shadow-md font-semibold text-black dark:text-white"
                  : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:block text-sm">{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* 🔹 Active Tab Content (fills the rest of the screen, doesn’t shift layout) */}
      <div className="flex-1 relative overflow-hidden bg-white dark:bg-gray-800 rounded-b-xl shadow">
        <div className="absolute inset-0">
          {tabs.find((t) => t.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}
