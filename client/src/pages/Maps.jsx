// pages/Maps.jsx
import { useState } from "react";
import HumanResources from "./HumanResources";
import Transportation from "./Transportation";
import Water from "./Water";
import Electricity from "./Electricity";
import Residential from "./Residential";
import Business from "./Business";
import Crime from "./Crime";

// Data imports
import { hrData } from "../data/hrData";
import { transportData } from "../data/transportData";
import { waterConsumption } from "../data/waterData";
import { electricityConsumption } from "../data/electricityData";
import { populationData } from "../data/populationData";
import { businessData } from "../data/businessData";
import { crimeData } from "../data/crimeData";

// Icons
import { Users, Bus, Droplet, Zap, Home, Briefcase, Shield } from "lucide-react";

export default function Maps() {
  const [activeTab, setActiveTab] = useState("humanresources");

  const totals = {
    humanresources: hrData.length,
    transportation: transportData.length,
    water: waterConsumption.reduce((sum, b) => sum + b.consumption, 0),
    electricity: electricityConsumption.reduce((sum, b) => sum + b.consumption, 0),
    residential: populationData.reduce((sum, r) => sum + r.population, 0),
    business: businessData.reduce((sum, b) => sum + b.businesses, 0),
    crime: crimeData.length,
  };

  const tabs = [
    { id: "humanresources", label: "Employees", name: "Employees:", color: "text-green-500", icon: <Users size={16} className="text-green-500" />, component: <HumanResources />, total: totals.humanresources },
    { id: "transportation", label: "Transportation", name: "Available Units:", color: "text-orange-500", icon: <Bus size={16} className="text-orange-500" />, component: <Transportation />, total: totals.transportation },
    { id: "water", label: "Water Consumption", name: "Water (cu-m):", color: "text-blue-500", icon: <Droplet size={16} className="text-blue-500" />, component: <Water />, total: totals.water },
    { id: "electricity", label: "Electricity", name: "Power (kWh):", color: "text-purple-500", icon: <Zap size={16} className="text-purple-500" />, component: <Electricity />, total: totals.electricity },
    { id: "residential", label: "Residential Population", name: "Population:", color: "text-pink-500", icon: <Home size={16} className="text-pink-500" />, component: <Residential />, total: totals.residential },
    { id: "business", label: "Business", name: "Businesses:", color: "text-cyan-500", icon: <Briefcase size={16} className="text-cyan-500" />, component: <Business />, total: totals.business },
    { id: "crime", label: "Crime", name: "Crimes:", color: "text-red-500", icon: <Shield size={16} className="text-red-500" />, component: <Crime />, total: totals.crime },
  ];

  const mapTabs = ["humanresources","transportation","water","electricity","residential","business","crime"];

  return (
    <div className="flex flex-col h-[calc(100vh-70px)]"> 
      {/* 🔹 Tabs Header sits BELOW the Navbar (Navbar = 56px) */}
      <div className="sticky z-[1001] bg-gray-200 dark:bg-gray-700 shadow-sm flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center flex-shrink-0 gap-2 px-3 py-2 rounded-t-lg cursor-pointer select-none border transition-all ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-900 border-gray-300 border-b-0 shadow-md font-semibold text-black dark:text-white"
                : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <span className={tab.color}>{tab.icon}</span>
            <span className="hidden sm:block text-sm">{tab.label}</span>
          </div>
        ))}
      </div>

      {/* 🔹 Active Tab Content (map stays fixed, doesn’t push page) */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          {tabs.find((t) => t.id === activeTab)?.component}
        </div>

        {/* 🔹 Summary Card */}
        {mapTabs.includes(activeTab) && (
          <div className="absolute bottom-4 left-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow-lg rounded-lg p-3 w-52 z-[1000]">
            <h3 className="font-semibold text-gray-700 dark:text-gray-700 mb-2 text-center">
              Profiles
            </h3>
            <ul className="space-y-1 text-xs">
              {tabs.map((tab) => (
                <li key={tab.id} className="flex justify-between items-center text-gray-700 dark:text-gray-700">
                  <span className="flex items-center gap-1">
                    <span className={tab.color}>{tab.icon}</span>
                    <span className="inline">{tab.name}</span>
                  </span>
                  <span className="font-medium">{tab.total.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
